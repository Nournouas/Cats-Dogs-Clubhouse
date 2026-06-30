const pool = require ("../database/pool");
require('dotenv').config();
const { validationResult, matchedData } = require("express-validator");
const { validateCode } = require("../utilities/validations")
const { selectAllMessages, 
        deleteMessageByID,
        insertMessage,
        selectFilteredMessages,
        updateUserMember,
        updateUserAdmin,
        } = require("../utilities/queries")

const homepageGetHandler = async (req, res, next) => {
  try{
    const { rows } = await pool.query(selectAllMessages);
    console.log(rows)
    if(req.user != undefined){
      res.render("homePage", { user : req.user, messages: rows, animalFilter: undefined });
    }else{
      res.render("homePage", { user : null, messages: rows, animalFilter: undefined });
    }
  }
  catch(err){
    next(err);
  }
}

const homepageDeleteMessage = async (req, res, next) => { 
  try{
    await pool.query(deleteMessageByID, [req.params.message_id])
    if (req.params.animal){
      res.redirect(`/homepage/${req.params.animal}`);
    }else{
      res.redirect("/homepage");
    }
  }
  catch(err){
    next(err);
  }
  

}

const secretPageGetHandler = (req, res) => {
  if (!req.user){
    res.redirect("/homepage")
  }else{
    res.render("secretCode", {errors: [], user : req.user})
  }
}


const addMessageHandler = async (req, res, next) => {
  try {
    await pool.query(insertMessage, [req.body.title, req.body.body, req.user.username, req.user.id, req.user.animal])
    res.redirect("/homepage")
  }
  catch(err) {
    next(err);
  }
}

const filteredHomepageGetHandler = async (req, res, next) => {
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
    rows = rows.rows
    if(req.user != undefined){
      res.render("homePage", { user : req.user, messages: rows, animalFilter: filterAnimal});
    }else{
      res.render("homePage", { user : null, messages: rows, animalFilter: undefined });
    }
  }
  catch(err){
    next(err);
  }
  
}

const processSecretCode = [
  validateCode,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("secretCode", {errors: errors.errors});
    }
    const { secret } = matchedData(req);
    try {
      if (secret === process.env.CLUB_SECRET) {
        await pool.query(updateUserMember, [req.user.id])
        res.render("congratulations", {role: "member" , user : req.user });
      } else if (secret === process.env.ADMIN_SECRET) {
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