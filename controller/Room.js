const asyncHandle = require("../middleware/async");

const errorHandel = require("../utils/errorResponse");
const mongoose = require("mongoose");
const Room = require("../models/Room");
const TypeRoom = require("../models/TypeRoom");

module.exports = {
    getRoom: asyncHandle(async (req, res, next) => {
        
        const room = await Room.find();
        res.status(200).send(room);

    }),
    postRoom:asyncHandle(async (req, res, next) => {

        const typeRoom = await TypeRoom.findById(req.params.id);
        if(!typeRoom){
            return next(new errorHandel(`Cannot find typeRoom with id ${req.params.id}`, 404));
        }
        req.body.typeRoom_id = req.params.id;
        const room = await Room.create(req.body);
        res.status(200).send(room);
    })

}



