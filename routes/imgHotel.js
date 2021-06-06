const express = require("express")

const router = express.Router();

const controller = require("../controller/ImageHotel");

router.get("/:id/",controller.getImageHotel);
router.post("/:id/imageHotel",controller.postImageHotel);


module.exports = router;
