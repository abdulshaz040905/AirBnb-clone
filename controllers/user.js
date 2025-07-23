const User = require("../models/user.js");

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderland");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome back to wanderland");
  let url = res.locals.originalUrl || "/listings";
  res.redirect(url);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("error", "You are logged out");
    res.redirect("/listings");
  });
};

module.exports.renderLoginPage = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.renderSignUpPage = (req, res) => {
  res.render("user/signup.ejs");
};
