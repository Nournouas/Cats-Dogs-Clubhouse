const express = require("express");
const indexRouter = express.Router();


indexRouter.get("/", (req, res) => {
  res.render("indexPage")
});

indexRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err){
      return next(err);
    }
    res.redirect("/")
  })
})

module.exports = {
  indexRouter,
}