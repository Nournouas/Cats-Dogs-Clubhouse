const passport = require("passport");

const loginGetHandler = (req, res) => {
  if (req.user){
    res.redirect("/homepage")
  }else{
    res.render("logIn", {errors: []});
  }
}

const loginPostHandler = passport.authenticate("local", {
  successRedirect: "/homepage",
  failureRedirect: "/login",
  failureMessage: true,
})

module.exports = {
  loginGetHandler,
  loginPostHandler
}