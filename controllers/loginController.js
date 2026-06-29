const passport = require("passport");

const loginGetHandler = (req, res) => {
  if (req.user){
    res.redirect("/homepage")
  }else if (req.session.messages){
    res.render("logIn", {errors: [], message: req.session.messages[req.session.messages.length-1]});
  }else{
    res.render("logIn", {errors: [], message: null});
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