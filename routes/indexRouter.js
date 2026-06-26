const express = require("express");
const indexRouter = express.Router();
const { indexHandler, logoutHandler } = require("../controllers/indexController");


indexRouter.get("/", indexHandler);

indexRouter.get("/logout", logoutHandler)

module.exports = {
  indexRouter,
}