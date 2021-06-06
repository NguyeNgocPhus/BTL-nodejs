const ImageHotel = require("../models/ImageHotel")

const asyncHandle = require("../middleware/async")

const errorHandel = require("../utils/errorResponse")
const path = require('path');
const fs = require("fs");


module.exports = {
    getImageHotel: asyncHandle(async (req, res, next) => {
        const image_Hotel = await ImageHotel.find();

        res.status(200).send(image_Hotel);

    }),
    postImageHotel: asyncHandle(async (req, res, next) => {
        let sampleFile;
        let uploadPath;
        var mongoose = require('mongoose');
        var objectId = mongoose.Types.ObjectId(req.params.id);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image_hotel
    
        const file_name = new Date().getTime() + '_' + sampleFile.name;
        
        uploadPath =`C:/Users/ADMIN/Desktop/btl/uploads/image_hotel/${file_name}`;
    
        //Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath,async function (err) {
            if (err)
                return res.status(500).send(err);
            else{
                const url = `http://localhost:3000/${file_name}`;
                const ans = await ImageHotel.create({
                    url:url,
                    hotel_id:objectId
                })
                res.send(ans)
            }
        });  
        
    })


}