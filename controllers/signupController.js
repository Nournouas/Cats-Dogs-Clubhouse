const { addNewUser } = require("../database/queries");
const pool = require ("../database/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("firstname").trim()
    .isAlphanumeric().withMessage("First name cannot use special symbols")
    .isLength({min: 1, max: 30}).withMessage("First name has to be betwen 1 and 30 characters"),
  body("lastname").trim()
    .isAlphanumeric().withMessage("Last name cannot use special symbols")
    .isLength({min: 1, max: 30}).withMessage("Last name has to be betwen 1 and 30 characters"),
  body("username").trim()
    .isAlphanumeric().withMessage("Username cannot use special symbols")
    .isLength({min: 1, max: 30}).withMessage("Username has to be betwen 1 and 30 characters"),
  body("password").trim()
    .isLength({min: 1}),
  body("passwordConfirm").trim()
    .isLength({min: 1})
    .custom((value, {req}) => {
      return value === req.body.password;
    }).withMessage("Password confirmation does not match the password"),
  body("animal").trim()
    .isAlphanumeric()
]

const signUpFormHandler = [
  validateUser,
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
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