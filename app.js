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
    pool : pool,                // Connection pool
    tableName : 'sessions'   // Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
  }),
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));
require("./controllers/passport");
app.use(passport.session())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/homepage", homeRouter);
app.use("/", indexRouter);

app.listen(3000);