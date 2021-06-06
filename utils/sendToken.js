module.exports = sendToken=async(user,statusCode,res)=>{
    const token =await user.createToken();

    res.status(statusCode).json({
        success:true,
        token:token
    })
}