const User = require("../models/user");
const asyncHandle = require("../middleware/async");
const errorResponse = require("../utils/errorResponse");
const sendToken = require("../utils/sendToken");
const sendMail= require("../utils/sendMail");
const crypto= require("crypto");
const mongoose= require("mongoose");

module.exports={
    // description : đăng kí tài khoản 
    // route:Post api/user/register
    register:asyncHandle(async(req,res,next)=>{
        const user =await User.create(req.body);
        sendToken(user,200,res);
    }),
    // description : đăng nhập tài khoản 
    // route: Post /api/user/login
    login:asyncHandle(async(req,res,next)=>{
        const {email,password} = req.body;
        if(!email || !password){
            return next(new errorResponse("bạn chua nhập email hoặc mật khẩu",400));
        }
        const user = await User.findOne({email:email}).select("+password");
    
        if(!email){
            return next(new errorResponse("email không đúng",400));
        }
        const isMatch =await user.matchPassword(password);
        if(!isMatch){
            return next(new errorResponse("mật khẩu không đúng",400));
        }
        sendToken(user,200,res);
    }),
    //@description :  xem profile
    //@route    GET  api/user/profile
    GetProfile:asyncHandle(async(req,res,next)=>{
        const id =mongoose.Types.ObjectId(req.user.id);
        const user1= await User.aggregate([
            
            {
                $lookup:{
                    from: "products",
                    pipeline:[
                        { $project: { user: 0, _id: 0 } }
                    ],
                    as: "product"
                }
            },
            
           
        ])
        res.send(user1)
        // res.status(200).json({
        //     success:true,
        //     user:req.user
        // })
    }),
    //@description :  update password
    //@route    Post  /api/user/updatePassword
    updatePassword:asyncHandle(async(req,res,next)=>{
        const user = await User.findById(req.user.id).select("+password");
        if(!req.body.currentPassword){
            return next(new errorResponse("bạn chưa nhập mk hiện tại",400));
        }
        if(!req.body.newPassword){
            return next(new errorResponse("bạn chưa nhập mk mới",400));
        }
        const matchPassword =await user.matchPassword(req.body.currentPassword);
        
        if(!matchPassword){
            return next(new errorResponse("mật khẩu bạn nhập không đúng",400));
        }
        user.password =  req.body.newPassword;
        await user.save();
        sendToken(user,200,res);
    }),
    //@description :  change profile(name,email)
    //@route    Put  /api/user/updateProfile
    updateProfile:asyncHandle(async(req,res,next)=>{
        const {name,email}= req.body;
        let update;
        if(name){
            update={
                name
            }
        }
        if(email){
            update={
                email
            }
        }
        if(name && email){
            update={
                name,
                email
            }
        }
        const user = await User.findByIdAndUpdate(req.user.id,update,{
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: user,
        });

    }),
    forgotPassword:asyncHandle(async(req,res,next)=>{
        const email = req.body.email;
        if(!email){
            return next(new errorResponse("bạn chưa nhập email",500));
        }
        const user= await User.findOne({email:email});
       
        if(!user){
            return next(new errorResponse("email bạn nhập ko tồn tại",500));
        }
        const resetToken = await user.resetToken();
        
        const userSave = await User.findOne({email:email});
        res.send(userSave);
        

        const url = `${req.protocol}://${req.get(
        "host"
        )}/api/user/reset/${resetToken}`;
        const message = `Bạn đã sử dụng tính năng quên mật khẩu , vui lòng nhấn vào ${url} để lấy lại mật khẩu `;
        await sendMail({
            email:req.body.email,
            message:message,
            subject:"quên mật khẩu"
        })
        res.status(200).json({
            success: true,
            data: 'Email sent'
        });


    }),
    resetPassword:asyncHandle(async(req,res)=>{
        const resetPasswordToken = crypto
                .createHash("sha256")
                .update(req.params.resetToken)
                .digest("hex"); 
       
        const user =await User.findOne({resetPasswordToken});
        
       
    })
    


}