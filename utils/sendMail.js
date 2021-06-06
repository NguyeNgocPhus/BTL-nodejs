const nodemailer = require("nodemailer");

const fn =async(option)=>{
    const tranporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL,
            pass:process.env.PASS
        }
    })
    const mailOption = {
        from:process.env.GMAIL,
        to:option.email,
        subject:option.object,
        text:option.message
    }
    const info = await tranporter.sendMail(mailOption);
}

module.exports=fn;