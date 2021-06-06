const express = require("express");


const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controller/Booking");

router.get("/booking",controller.getBooking);

module.exports = router;
