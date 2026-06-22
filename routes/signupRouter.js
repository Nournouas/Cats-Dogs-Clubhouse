const express = require("express");
const signupRouter = express.Router();
const { signUpFormHandler } = require("../controllers/signupController")

signupRouter.get("/", (req, res) => {
  res.render("signUp", {errors: []});
});
signupRouter.post("/",  signUpFormHandler);

module.exports = {
  signupRouter,
}