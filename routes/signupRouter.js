const express = require("express");
const signupRouter = express.Router();
const { signupPostHandler, signupGetHandler } = require("../controllers/signupController")

signupRouter.get("/", signupGetHandler);
signupRouter.post("/",  signupPostHandler);

module.exports = {
  signupRouter,
}