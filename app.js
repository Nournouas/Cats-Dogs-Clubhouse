const path = require("node:path")
const express = require("express");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const passport = require("passport");
const app = express()

const { indexRouter } = require("./routes/indexRouter");
const { signupRouter } = require("./routes/signupRouter");
const { loginRouter } = require("./routes/loginRouter");
const { homeRouter } = require("./routes/homeRouter")

const pool = require ("./database/pool");

// express setup
require('dotenv').config();
app.use(session({
  store: new pgSession({
    pool : pool,              
    tableName : 'catsdogs'
  }),
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
}));
require("./utilities/passport");
app.use(passport.session())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//routes
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/homepage", homeRouter);
app.use("/", indexRouter);
app.use((req, res, next) => {
  res.status(404).render("errors", {message: "404 - page not found!"})
});

app.use((err, req, res, next) => {
  if (err.status === 500 || err.status === 502 || err.status === 503 || err.status === 504){
    res.status(500).render("errors", {message: "Server Errors, Please try again"})
  }else if (err.status === 400 || err.status === 403 || err.status === 408 || err.status === 429){
    res.status(400).render("errors", {message: "Client Error"})
  }else{
    res.status(500).render("errors", {message: "Server Errors, Please try again"})
  }
})

app.listen(3000);