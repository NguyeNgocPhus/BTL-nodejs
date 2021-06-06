const mongoose = require("mongoose");



const ImageHotel = new mongoose.Schema({
    url:{
        type:String,
        require:[true,"chưa nhập hình ảnh"]
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    hotel_id:{
        type:mongoose.Schema.ObjectId,
        require:[true],
        ref:"Hotel"

    }
})
module.exports = mongoose.model('ImageHotel',ImageHotel);