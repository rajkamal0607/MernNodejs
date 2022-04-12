const express = require("express");
const router = express.Router();
const {postUserdata,getUserdata,getOwndata,updateUserdata,deleteUserdata,userlogin} = require("../controller/user_controller");

router.post("/register",postUserdata);

router.get("/getdata",getUserdata);

router.get("/getuser/:id",getOwndata);

router.patch("/updateuser/:id",updateUserdata);

router.delete("/deleteuser/:id",deleteUserdata);

router.post("/login",userlogin);


module.exports = router;