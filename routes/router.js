const express = require("express");
const router = express.Router();
const {postUserdata,getUserdata,getOwndata,updateUserdata,deleteUserdata} = require("../controller/user_controller");

router.post("/register",postUserdata);

router.get("/getdata",getUserdata);

router.get("/getuser/:id",getOwndata);

router.patch("/updateuser/:id",updateUserdata);

router.delete("/deleteuser/:id",deleteUserdata);


module.exports = router;