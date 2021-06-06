const express= require("express");

const router = express.Router();
const controller= require("../controller/user")
const auth = require("../middleware/auth");
router.post("/api/user/register",controller.register);
router.post("/api/user/login",controller.login);
router.get("/api/user/profile",auth.protect,controller.GetProfile);
router.post("/api/user/updatePassword",auth.protect,controller.updatePassword);
router.put("/api/user/updateProfile",auth.protect,controller.updateProfile);
router.post("/api/user/forgotPassword",controller.forgotPassword);
router.get("/api/user/reset/:resetToken",(req,res)=>{
    res.render("view",{resetToken:req.params.resetToken});
})
router.post("/api/user/reset/:resetToken",controller.resetPassword)

module.exports = router;
