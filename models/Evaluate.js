const mongoose = require("mongoose");




const Evaluate = new  mongoose.Schema({
    staff:{
        type:Number,
        min: 1,
        max: 10,
        require:[true,"bạn chư nhập đánh giá nhân viên"]
    },
    location:{
        type:Number,
        min: 1,
        max: 10,
        require:[true,"bạn chưa nhập đánh giá nơi ở"]
    },
    convenient:{
        type:Number,
        min: 1,
        max: 10,
        require:[true,"bạn chưa nhập đánh giá về sự tiện nghi"]
    },
    comfortable:{
        type:Number,
        min: 1,
        max: 10,
        require:[true,"bạn chưa nhập đánh giá về độ thoải mái"]
    },
    worth_money:{
        type:Number,
        min: 1,
        max: 10,
        require:[true,"bạn chưa nhập đánh giá về độ hài lòng "]
    },
    clean:{
        type:Number,
        min: 1,
        max: 10,
        require:[true,"bạn chưa nhập đánh giá về vệ sinh"]
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    hotel_id:{
        type: mongoose.Schema.ObjectId,
        ref:"Hotel",
        require:[true]
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:[true]
    }

})
Evaluate.index({ hotel_id: 1, user_id: 1 }, { unique: true });

Evaluate.statics.getAverageRating = async function(hotelid){
    const ob =await this.aggregate([
        {
            $match:{
                hotel_id:hotelid
            }

        }
    ])
    let avg =0;
    for(var i=0;i< ob.length;i++){
        avg += (ob[i].staff+ob[i].location+ob[i].convenient+ob[i].comfortable+ob[i].worth_money+ob[i].clean)/6;
    }
    avg=avg/ob.length;
    try {
        await this.model('Hotel').findByIdAndUpdate(hotelid, {
          reviews: avg
        });
      } catch (err) {
        console.error(err);
      }

    console.log(avg);
}

Evaluate.post('save', async function(){
    await this.constructor.getAverageRating(this.hotel_id);
});

module.exports = mongoose.model("Evaluate",Evaluate)