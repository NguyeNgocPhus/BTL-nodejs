const express = require("express")

const router = express.Router();

const controller = require("../controller/Hotel");

router.get("/hotel",controller.getHotel);
router.get("/hotel/:id",controller.detailHotel);
router.post("/hotel",controller.postHotel);


module.exports = router;
