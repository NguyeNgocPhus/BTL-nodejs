const Evaluate = require("../models/Evaluate");
const Hotel = require("../models/Hotel");

const asyncHandle = require("../middleware/async")

const errorHandel = require("../utils/errorResponse");

const db = require("../config/db");
module.exports = {
    getEvaluate: asyncHandle(async (req, res, next) => {
        const evaluate = await db.evaluates.find();

        res.status(200).send(evaluate);

    }),
    postEvaluate: asyncHandle(async (req, res, next) => {
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel){
            return next(new errorHandel("ko tim thay id khach san",400));
        }
        req.body.hotel_id = req.params.id;
        
        req.body.user_id = req.user._id;

        const evaluate = await Evaluate.create(req.body);
        res.status(200).send(evaluate);
    })

}