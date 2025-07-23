const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { originalUrl } = require("../views/middleware/isLoggedIn.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(originalUrl, userController.renderSignUpPage)
  .post(wrapAsync(userController.signUp));

router
  .route("/login")
  .get(userController.renderLoginPage)
  .post(
    originalUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
