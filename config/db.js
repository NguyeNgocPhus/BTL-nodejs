const mongoose = require("mongoose");

const connect = async()=>{
    try {
        const connect =await mongoose.connect("mongodb://localhost:27017/BTL",{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        })
        console.log("connect successfully");
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = connect;