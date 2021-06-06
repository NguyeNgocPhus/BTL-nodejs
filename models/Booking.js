const mongoose = require("mongoose");


const Booking  = new mongoose.Schema({
    booking_date:{
        type:String ,
        require:[true,"nhap ngay dat"]
    },
    check_out_date:{
        type:String,
        require:[true,"nhap ngay dat"]
    },
    create_at:{
        default:Date.now()
    },
    hotel_id:{
        type:mongoose.Schema.ObjectId,
        require:[true],
        ref:"Hotel"
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    }
})
module.exports = mongoose.model("Booking",Booking)