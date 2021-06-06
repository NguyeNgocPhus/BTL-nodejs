const express=require("express");
const connect = require("./config/db");

const fs = require('fs');
const path = require('path');
const morgan = require("morgan");


const fileUpload = require('express-fileupload');
const error = require("./middleware/error");
const bodyParser = require('body-parser');


require("dotenv").config({
    path:'./config/.env'
})
//connet db
connect();

const app=express();
app.use(express.static("uploads/image_hotel"));
app.use(express.static("uploads/image_typeRoom"));
app.use(fileUpload());
app.use(morgan('dev'));


//use body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// views
app.set("view engine","ejs");
app.set("views","./views");

//route
const user = require("./routes/user");
const hotel = require("./routes/hotel");
const typeRoom = require("./routes/typeRoom");
const room = require("./routes/room");
const comment = require("./routes/comment");
const evaluate = require("./routes/evaluate");
const imageHotel = require("./routes/imgHotel");
const imageTypeRoom = require("./routes/imageTypeRoom")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use("/",user);
app.use("/",hotel);
app.use("/",typeRoom);
app.use("/",room);
app.use("/",comment);
app.use("/",evaluate);
app.use("/",imageHotel);
app.use("/",imageTypeRoom);



app.use(error);

app.listen(3000,()=>{
    console.log("run port 3000");
})
