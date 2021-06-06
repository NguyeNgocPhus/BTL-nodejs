const mongoose = require("mongoose");


const Hotel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: [true]
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String,
    },
    reviews: {
        type: Number,
        default: null
    }
    ,
    description: {
        type: String,
        require: [true]
    }
})

Hotel.statics.evaluate = async function (id) {
    const evaluate = await this.aggregate([
        {
            $match: {
                _id: id
            }
        }, {
            $lookup: {
                from: "evaluates",
                localField: "_id",
                foreignField: "hotel_id",
                as: "evalua"
            }
        }

    ])
    let Array_evaluate = evaluate[0].evalua;

    let  avg= {
        staff:0,
        location:0,
        convenient:0,
        comfortable:0,
        worth_money:0,
        clean:0
    };
    //console.log(Array_evaluate);
    for (var i = 0; i < Array_evaluate.length; i++) {
        avg.staff = avg.staff + Array_evaluate[i].staff;
        avg.location = avg.location+Array_evaluate[i].location;
        avg.convenient = avg.convenient+ Array_evaluate[i].convenient;
        avg.comfortable =avg.comfortable+ Array_evaluate[i].comfortable;
        avg.worth_money =avg.worth_money+ Array_evaluate[i].worth_money;
        avg.clean =avg.clean+ Array_evaluate[i].clean;
    }
    avg={
        staff:(avg.staff/Array_evaluate.length),
        location:(avg.location/Array_evaluate.length),
        convenient:(avg.convenient/Array_evaluate.length),
        comfortable:(avg.comfortable/Array_evaluate.length),
        worth_money:(avg.worth_money/Array_evaluate.length),
        clean:(avg.clean/Array_evaluate.length),

    }
    return avg;
}

module.exports = mongoose.model("Hotel", Hotel);