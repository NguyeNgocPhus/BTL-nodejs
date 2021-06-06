const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bạn chưa nhập tên."],
    },
    email: {
        type: String,
        required: [true, "Bạn chưa nhập email."],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Nhập sai định dạng email.",
        ],
    },
    password: {
        type: String,
        required: [true, "Bạn chưa nhập mật khẩu."],
        minlength: [6, "Mật khẩu vừa nhập ngắn hơn 6 thứ tự."],
        select: false,
    },
    role: {
        type: String,
        enum: ["member", "mod", "admin"],
        default: "member",
    },
    avatar: {
        type: String,
        default: "avatar.jpg",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    boughted: {
        type: [],
        default: undefined,
    }
})
Userschema.pre("save",async function(){
    const salt =await bcrypt.genSaltSync(10);
    this.password =await bcrypt.hash(this.password,salt);
})
Userschema.methods.matchPassword= async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
    
}
Userschema.methods.createToken = async function(){
    return await jwt.sign({id:this._id},process.env.JWT_SECRET);

}
Userschema.methods.resetToken = async function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //this.resetPasswordExpire = Date.now() + 10*60*1000;
  
    return resetToken;
}
module.exports = mongoose.model('User',Userschema);