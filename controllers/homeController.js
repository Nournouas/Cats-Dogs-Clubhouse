const pool = require ("../database/pool");
require('dotenv').config();
const { body, validationResult, matchedData } = require("express-validator");

const validateCode = [
  body("secret").trim()
  .isAlpha().withMessage("Secret Code does not container numbers")
  .isLength({min: 1})
  .custom((value) =>{
    return value === process.env.CLUB_SECRET
  }).withMessage("You like snails?")
]

const addMessage = async (req, res) => {
  try{
    await pool.query(`INSERT INTO messages (title, body, user_id)
      VALUES ($1, $2, $3);`, [req.body.title, req.body.body, req.user.id])
    res.redirect("/homepage")
  }catch(err){
    console.log(err)
    res.redirect("/homepage")
  }
}

const processSecretCode = [
  validateCode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("secretCode", {errors: errors.errors});
    }
    try{
      await pool.query(`UPDATE users SET is_member = true WHERE id = $1`, [req.user.id])
      res.render("congratulations", { user : req.user });
    }catch(err){
      res.redirect("/")
    } 
  }
]

module.exports= {
  processSecretCode,
  addMessage
}