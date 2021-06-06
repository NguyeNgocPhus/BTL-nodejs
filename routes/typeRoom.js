const express = require("express")

const router = express.Router();

const controller = require("../controller/TypeRoom");

router.get("/:id/typeRoom",controller.getTypeRoom);
router.post("/:id/typeRoom",controller.postTypeRoom);


module.exports = router;
