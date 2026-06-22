const express = require("express");
const homeRouter = express.Router();


homeRouter.get("/", (req, res) => {
  res.render("homePage", { user : req.user });
});

homeRouter.get("/secret", (req, res) => {
  res.render("secretCode")
});
homeRouter.post("/secret", (req, res) => {
  res.render("secretCode")
});

module.exports = {
  homeRouter,
}