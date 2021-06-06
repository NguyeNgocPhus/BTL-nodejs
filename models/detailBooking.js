const mongoose = require("mongoose");


const DetailBooking  = new mongoose.Schema({
    total:{
        type:Number ,
        require:[true,"nhap ngay dat"]
    },
    typeRoom_id :{
        type:mongoose.Schema.ObjectId,
        ref:"TypeRoom"
    },
    booking_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Booking"
    }
})
module.exports = mongoose.model("DetailBooking",DetailBooking)