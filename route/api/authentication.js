 const express = require("express");
const router = express.Router();
const registrationController = require("../../controller/registrationController");
const {emailverifiedController, emailVerificationController }= require("../../controller/emailverifiedController");
const loginController = require("../../controller/loginController");


router.post("/registration", registrationController)
router.post("/emailverification", emailverifiedController)
router.post("/login", loginController)
router.get("/emailverification/:id", emailVerificationController)


 
module.exports = router;