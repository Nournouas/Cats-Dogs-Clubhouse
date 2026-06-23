const express = require("express");
const homeRouter = express.Router();
const { processSecretCode, addMessage } = require("../controllers/homeController")
const pool = require ("../database/pool");

homeRouter.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM messages;");
  res.render("homePage", { user : req.user, messages: rows });
});

homeRouter.get("/secret", (req, res) => {
  res.render("secretCode", {errors: []})
});
homeRouter.post("/secret", processSecretCode);
homeRouter.post("/new", addMessage)

module.exports = {
  homeRouter,
}