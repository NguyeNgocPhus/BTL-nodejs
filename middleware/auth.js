
const asyncHandle = require("../middleware/async");
const errorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User= require("../models/user.js");
module.exports={

    protect:asyncHandle(async(req,res,next)=>{
        const BearerToken =req.headers.authorization;
        if(!req.headers.authorization){
            return next(new errorResponse("bạn không có quyền truy câp",500));
        }
        const token = BearerToken.split(' ')[1];
        const decoded =await jwt.verify(token, process.env.JWT_SECRET);
       // console.log(decoded);
        const user = await User.findById(decoded.id).select("+password");
        //console.log(user);
        req.user=user;
       
        next();


    }),
    check:(...role)=>{
        
        return(req,res,next)=>{
            //console.log(req.user);
            if(!role.includes(req.user.role)) {
                return next( new ErrorResponse(`Bạn không có quyền truy cập.`, 403));
            }
            next(); 
        }
    }
}