const mongoose = require("mongoose");



const TypeRoom = new  mongoose.Schema({
    name:{
        type:String,
        require:[true,"bạn chưa nhập tên loại phòng"]
    },
    price:{
        type:Number,
        require:[true,"bạn chưa nhập giá phòng"]
    },
    description:{
        type:String,
        require:[true,"nhập mô tả loại phòng"]
    },
    hotel_id:{
        type:mongoose.Schema.ObjectId,
        require:[true],
        ref:"Hotel"
    }
})

module.exports = mongoose.model("TypeRoom",TypeRoom);