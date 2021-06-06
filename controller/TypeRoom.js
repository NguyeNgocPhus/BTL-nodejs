const TypeRoom = require("../models/TypeRoom");
const Hotel = require("../models/Hotel");

const asyncHandle = require("../middleware/async");

const errorHandel = require("../utils/errorResponse");
const mongoose = require("mongoose");


module.exports = {
    getTypeRoom: asyncHandle(async (req, res, next) => {
        
        const typeroom = await TypeRoom.aggregate([
            {
                $lookup:{
                    from: "imagetyperooms",
                    localField: "_id",
                    foreignField: "typeRoom_id",
                    as: "imageTypeRoom"
                }
            }
        ]);
        res.status(200).send(typeroom);

    }),
    postTypeRoom:asyncHandle(async (req, res, next) => {
        //  console.log("db");
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel){
            return next(new errorHandel(`Cannot find hotel with id ${req.params.id}`, 404));
        }
        req.body.hotel_id = req.params.id;
        const typeroom = await TypeRoom.create(req.body);
        res.status(200).send(typeroom);
    })

}



