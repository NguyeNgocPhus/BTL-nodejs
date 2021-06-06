const errorResponse = require("../utils/errorResponse");

const fn = (error, req, res, next) => {
    let err = { ...error };

    err.message = error.message;
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map((value) => value.message);
        err = new errorResponse(messager, 400);

    }
    if(error.code === 11000){
        const message = 'Duplicate value.';
        err = new errorResponse(message, 400);
    }
    //console.log(error);
    res.status(500).json({
        success: false,
        message: err.message
    })

}
module.exports = fn;