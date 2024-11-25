const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const {validateJwtToken} = require("../middleware/jwtMiddleware");

router.post("/register",validateJwtToken, doctorController.registerDoctor);
//router.get("/", doctorController.getAllDoctors)
//router.get("/email/:email", doctorController.g);

module.exports=router;