const Hotel = require("../models/Hotel");
const TypeRoom = require("../models/TypeRoom");
const Room = require("../models/Room");
const asyncHandle = require("../middleware/async");
var mongoose = require('mongoose');

const ImageHotel = require("../models/ImageHotel");
const errorHandel = require("../utils/errorResponse");



module.exports = {
    detailHotel: asyncHandle(async (req, res, next) => {
        if (!req.params.id) {
            return next(new errorHandel("ban chua co khach san"))
        }
        var booking_date = new Date(req.body.booking_date);
        var check_out_date = new Date(req.body.check_out_date);
        const day = (check_out_date.getTime() - booking_date.getTime()) / (1000 * 3600 * 24);
        var objectId = mongoose.Types.ObjectId(req.params.id);

        const evaluate_avg = await Hotel.evaluate(objectId);
        //console.log(evaluate_avg);
        
        const hotel = await Hotel.aggregate([
            {
                $match: {
                    _id: objectId
                },

            }, {
                $lookup: {
                    from: "typerooms",
                    localField: "_id",
                    foreignField: "hotel_id",
                    as: "type_room"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "hotel_id",
                    as: "comments"
                }
            }, {
                $lookup: {
                    from: "imagehotels",
                    localField: "_id",
                    foreignField: "hotel_id",
                    as: "image"
                }
            }
           ,{
               $set:{
                    evaluate_avg:evaluate_avg
               }
           }
        ])
        for(var i=0;i<hotel.length;i++){
            for(var j=0;j<hotel[i].type_room.length;j++){
                hotel[i].type_room[j].price=hotel[i].type_room[j].price*day;
            }
        }
        res.send(hotel)
    }),
    getHotel: asyncHandle(async (req, res, next) => {
        var booking_date = new Date(req.body.booking_date);
        var check_out_date = new Date(req.body.check_out_date);
        const day = (check_out_date.getTime() - booking_date.getTime()) / (1000 * 3600 * 24);
        if (!req.body.city) {
            return next(new errorHandel("ban chua nhap vi tri den", 400));
        }
        if (!req.body.booking_date) {
            return next(new errorHandel("ban chua nhap ngay den", 400));
        }
        if (!req.body.check_out_date) {
            return next(new errorHandel("ban chua nhap ngay di", 400));
        }
        const hotel = await Hotel.aggregate([
            {
                $match: {
                    city: req.body.city
                }
            },
            {
                $lookup: {
                    from: "typerooms",
                    localField: "_id",
                    foreignField: "hotel_id",
                    as: "type_room"
                }
            }, {
                $unwind: {
                    path: "$type_room",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: "rooms",
                    localField: "type_room._id",
                    foreignField: "typeRoom_id",
                    as: "type_room.room"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    reviews: { $first: "$reviews" },
                    name: { $first: "$name" },
                    street: { $first: "$street" },
                    city: { $first: "$city" },
                    country: { $first: "$country" },
                    description: { $first: "$description" },
                    type_room: { $push: "$type_room" }
                }
            },
        ]);
        for(var i=0;i<hotel.length;i++){
            for(var j=0;j<hotel[i].type_room.length;j++){
                hotel[i].type_room[j].price=hotel[i].type_room[j].price*day;
            }
        }
        res.send(hotel);

    }),
    postHotel: asyncHandle(async (req, res, next) => {
        console.log("db");
        const hotel = await Hotel.create(req.body);
        res.status(200).send("ok");
    }),

}




