const Comment  = require("../models/Comment")

const asyncHandle = require("../middleware/async")
const Hotel = require("../models/Hotel");

const errorHandel = require("../utils/errorResponse")


module.exports = {
    getComment: asyncHandle(async (req, res, next) => {
        const comment = await Comment.find();

        res.status(200).send(comment);

    }),
    postComment: asyncHandle(async (req, res, next) => {
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel){
            return next(new errorHandel("ko tim thay id khach san",400));
        }
        req.body.user_id=req.user._id ;
        req.body.hotel_id = req.params.id;
        const  comment = await Comment.create(req.body);
        res.status(200).send(comment);
    })

}
