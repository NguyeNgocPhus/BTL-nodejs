const mongoose = require("mongoose")



const ImageTypeRoom = new mongoose.Schema({
    url:{
        type:String,
        require:[true]
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    typeRoom_id:{
        type:mongoose.Schema.ObjectId,
        require:[true],
        ref:"TypeRoom"
    }
})
module.exports= mongoose.model('ImageTypeRoom',ImageTypeRoom);