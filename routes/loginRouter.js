const express = require("express");
const loginRouter = express.Router();
const { loginGetHandler, loginPostHandler } = require("../controllers/loginController");

loginRouter.get("/", loginGetHandler);
loginRouter.post("/",  loginPostHandler);

module.exports = {
  loginRouter,
}