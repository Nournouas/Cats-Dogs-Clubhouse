const indexHandler = (req, res) => {
  if (req.user){
    res.redirect("/homepage");
  }else{
    res.render("indexPage")
  }
}

const logoutHandler = (req, res, next) => {
  req.logout((err) => {
    if (err){
      return next(err);
    }
    res.redirect("/")
  })
}

module.exports = {
  indexHandler,
  logoutHandler
}