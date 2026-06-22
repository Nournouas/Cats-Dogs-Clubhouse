const express = require("express");
const passport = require("passport");
const loginRouter = express.Router();
//const { signUpFormHandler } = require("../controllers/signupController")

loginRouter.get("/", (req, res) => {
  res.render("logIn", {errors: []});
});
loginRouter.post("/",  passport.authenticate("local", {
  successRedirect: "/homepage",
  failureRedirect: "/login",
  failureMessage: true,
}));

module.exports = {
  loginRouter,
}