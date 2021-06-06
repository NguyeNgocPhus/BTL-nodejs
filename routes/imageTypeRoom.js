const express = require("express")

const router = express.Router();

const controller = require("../controller/ImageTypeRoom");

router.get("/:id/",controller.getImageTypeRoom);
router.post("/:id/imageTypeRoom",controller.postImageTypeRoom);


module.exports = router;
