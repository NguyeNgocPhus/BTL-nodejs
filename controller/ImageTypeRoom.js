const ImageTypeRoom = require("../models/ImageTypeRoom")

const asyncHandle = require("../middleware/async")

const errorHandel = require("../utils/errorResponse")
const path = require('path');
const fs = require("fs");


module.exports = {
    getImageTypeRoom: asyncHandle(async (req, res, next) => {
        const image_Hotel = await ImageTypeRoom.find();

        res.status(200).send(image_Hotel);

    }),
    postImageTypeRoom: asyncHandle(async (req, res, next) => {
        let sampleFile;
        let uploadPath;
        var mongoose = require('mongoose');
        var objectId = mongoose.Types.ObjectId(req.params.id);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image_typeRoom
        //console.log(sampleFile);
        const file_name = new Date().getTime() + '_' + sampleFile.name;
        
        uploadPath =`C:/Users/ADMIN/Desktop/btl/uploads/image_typeRoom/${file_name}`;
        //console.log(uploadPath);
        //Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath,async function (err) {
            if (err)
                return res.status(500).send(err);
            else{
                const url = `http://localhost:3000/${file_name}`;
                const ans = await ImageTypeRoom.create({
                    url:url,
                    typeRoom_id:objectId
                })
                res.send(ans);
            }
        });  
        
    })


}