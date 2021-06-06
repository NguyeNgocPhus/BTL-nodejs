const express= require("express");


const router = express.Router();

const controller = require("../controller/Evaluate");
const auth = require("../middleware/auth");

router.get("/:id/evaluate",controller.getEvaluate);

router.post("/:id/evaluate",auth.protect,controller.postEvaluate);

module.exports = router;