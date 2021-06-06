const express = require("express");


const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controller/Comment");

router.get("/comment",controller.getComment)
router.post("/:id/comment",auth.protect,controller.postComment);

module.exports = router;
