const path = require("node:path")
const express = require("express");
const app = express()
const { indexRouter } = require("./routes/indexRouter");

// express setup
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

//ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));



app.get("/", indexRouter)

app.listen(3000);