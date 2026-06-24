const express = require("express");
const homeRouter = express.Router();
const { processSecretCode, addMessage } = require("../controllers/homeController")
const pool = require ("../database/pool");

homeRouter.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM messages;");
  if(req.user != undefined){
    res.render("homePage", { user : req.user, messages: rows, animalFilter: undefined });
  }else{
    res.render("homePage", { user : null, messages: rows, animalFilter: undefined });
  }
  
});



homeRouter.get("/delete/:message_id{/:animal}", async (req, res) => {
  const animal = req.params.animal
  console.log(animal)
  await pool.query(`DELETE FROM messages
    WHERE id = $1`, [req.params.message_id])
  if (animal){
    res.redirect(`/homepage/${animal}`);
  }else{
    res.redirect("/homepage");
  }
});

homeRouter.get("/secret", (req, res) => {
  res.render("secretCode", {errors: [], user : req.user})
});
homeRouter.post("/secret", processSecretCode);
homeRouter.post("/new", addMessage)

homeRouter.get("/:filter", async (req, res) => {
  const filterAnimal = req.params.filter
  let rows;
  switch (filterAnimal){
    case "dog":
      rows = await pool.query("SELECT * FROM messages WHERE animal = $1;", [filterAnimal]);
      break;
    case "cat":
      rows = await pool.query("SELECT * FROM messages WHERE animal = $1;", [filterAnimal]);
      break;
    case "both":
      rows = await pool.query("SELECT * FROM messages");
      break;
  }
  rows = rows.rows
  if(req.user != undefined){
    res.render("homePage", { user : req.user, messages: rows, animalFilter: filterAnimal});
  }else{
    res.render("homePage", { user : null, messages: rows, animalFilter: undefined });
  }
  
});

module.exports = {
  homeRouter,
}