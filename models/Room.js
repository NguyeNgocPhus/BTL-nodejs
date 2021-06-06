const mongoose = require("mongoose");


const Room = new mongoose.Schema({

    roomNumber: {
        type: String,
        required: [true, "Bạn chưa nhập tên."],
    },
    booking_date:{
        type:Date,
        default:null
        
    },
    check_out_date:{
        type:Date,
        default:null
    },
    description:{
        type:String,
        require:true,
    },
    checkRoom:{
        type:Boolean,
        default:false
    },
    typeRoom_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"TypeRoom"
    }
    
})
module.exports = mongoose.model("Room",Room);
