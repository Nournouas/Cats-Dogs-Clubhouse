const pool = require ("../database/pool");
const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");
const { validateUser } = require("../utilities/validations");
const { addNewUser } = require("../utilities/queries")

const signupGetHandler = (req, res) => {
    if (req.user){
    res.redirect("/homepage")
  }else{
    res.render("signUp", {errors: []});
  }
}

const signupPostHandler = [
  validateUser,
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signUp", {errors: errors.errors});
  }
  const {
    firstname,
    lastname,
    username,
    password,
    animal
  } = matchedData(req);
  
  try{
    const hashedPass = await bcrypt.hash(password, 10);
    const values = [firstname, lastname, username, hashedPass, animal];
    await pool.query(addNewUser, values);
    res.redirect("/login");
  } 
  catch (err) {
    next(err)
  }
}]

module.exports = {
  signupPostHandler,
  signupGetHandler
}