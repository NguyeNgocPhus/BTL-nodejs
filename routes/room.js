const express = require("express")

const router = express.Router();

const controller = require("../controller/Room");

router.get("/:id/room",controller.getRoom);
router.post("/:id/room",controller.postRoom);


module.exports = router;
