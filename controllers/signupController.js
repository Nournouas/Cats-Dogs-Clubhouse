const { addNewUser } = require("../database/queries");
const pool = require ("../database/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("firstname").trim()
    .isAlphanumeric()
    .isLength({min: 1, max: 30}),
  body("lastname").trim()
    .isAlphanumeric()
    .isLength({min: 1, max: 30}),
  body("username").trim()
    .isAlphanumeric()
    .isLength({min: 1, max: 30}),
  body("password").trim()
    .isAlphanumeric()
    .isLength({min: 1}),
  body("animal").trim()
    .isAlphanumeric()
]

const signUpFormHandler = [
  validateUser,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).redirect("/");
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
      res.redirect("/");
    } catch (err) {
      console.error(err);
      // TODO add error handling
      res.redirect("/");
    }

    
    
  }
]

module.exports = {
  signUpFormHandler,
}