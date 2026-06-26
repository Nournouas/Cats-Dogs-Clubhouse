const pool = require ("../database/pool");
require('dotenv').config();
const { alidationResult, matchedData } = require("express-validator");
const { validateCode } = require("../utilities/validations")
const { selectAllMessages, 
        deleteMessageByID,
        insertMessage,
        selectFilteredMessages,
        updateUserMember,
        updateUserAdmin,
        
      } = require("../utilities/queries")

const homepageGetHandler = async (req, res) => {
  try{
    const { rows } = await pool.query(selectAllMessages);
  }
  catch(err){
    next(err);
  }
  
  if(req.user != undefined){
    res.render("homePage", { user : req.user, messages: rows, animalFilter: undefined });
  }else{
    res.render("homePage", { user : null, messages: rows, animalFilter: undefined });
  }
}

const homepageDeleteMessage = async (req, res) => { 
  try{
    await pool.query(deleteMessageByID, [req.params.message_id])
  }
  catch(err){
    next(err);
  }
  
  if (req.params.animal){
    res.redirect(`/homepage/${req.params.animal}`);
  }else{
    res.redirect("/homepage");
  }
}

const secretPageGetHandler = (req, res) => {
  if (!req.user){
    res.redirect("/homepage")
  }else{
    res.render("secretCode", {errors: [], user : req.user})
  }
}


const addMessageHandler = async (req, res) => {
  try {
    await pool.query(insertMessage, [req.body.title, req.body.body, req.user.username, req.user.id, req.user.animal])
    res.redirect("/homepage")
  }
  catch(err) {
    next(err);
  }
}

const filteredHomepageGetHandler = async (req, res) => {
  const filterAnimal = req.params.filter
  let rows;
  try{
    switch (filterAnimal){
    case "dog":
      rows = await pool.query(selectFilteredMessages, [filterAnimal]);
      break;
    case "cat":
      rows = await pool.query(selectFilteredMessages, [filterAnimal]);
      break;
    case "both":
      rows = await pool.query(selectAllMessages);
      break;
    }
  }
  catch(err){
    next(err);
  }
  rows = rows.rows
  if(req.user != undefined){
    res.render("homePage", { user : req.user, messages: rows, animalFilter: filterAnimal});
  }else{
    res.render("homePage", { user : null, messages: rows, animalFilter: undefined });
  }
}

const processSecretCode = [
  validateCode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("secretCode", {errors: errors.errors});
    }
    const { secret } = matchedData(req);
    try {
      if (secret === process.env.CLUB_SECRET) {
        await pool.query(updateUserMember, [req.user.id])
        res.render("congratulations", {role: "member" , user : req.user });
      }
      else if (secret === process.env.ADMIN_SECRET) {
        await pool.query(updateUserMember, [req.user.id])
        await pool.query(updateUserAdmin, [req.user.id])
        res.render("congratulations", {role: "admin" , user : req.user });
      }
      
    }
    catch(err) {
      next(err);
    } 
  }
]

module.exports= {
  homepageGetHandler,
  processSecretCode,
  addMessageHandler,
  homepageDeleteMessage,
  secretPageGetHandler,
  filteredHomepageGetHandler
}