const express = require("express");
const router = express.Router();
const authController = require("../Controller/authcontroller");

router.get("/login", authController.loginPage);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// signup routes
router.get("/signup", authController.signupPage);
router.post("/signup", authController.signup);

module.exports = router;
