// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const {registerUser, loginUser} = require("../controllers/userControllers"); // Correct path to modules
//const jwtAuthMiddleware = require("../middlewares/jwtMiddleware");
const {generateJwtToken} = require('../middleware/jwtMiddleware.js');




// Register a new user
router.post("/login", generateJwtToken, loginUser);
router.post("/register", registerUser);

module.exports=router;
