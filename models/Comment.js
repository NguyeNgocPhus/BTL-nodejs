const mongoose = require("mongoose");




const Comment = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    },
    hotel_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"Hotel"
    }

})
module.exports = mongoose.model("Comment",Comment);