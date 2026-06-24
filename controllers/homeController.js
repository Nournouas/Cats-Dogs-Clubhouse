const pool = require ("../database/pool");
require('dotenv').config();
const { body, validationResult, matchedData } = require("express-validator");
const validateCode = [
  body("secret").trim()
  .isAlpha().withMessage("Secret Code does not container numbers")
  .isLength({min: 1})
]

const addMessage = async (req, res) => {
  try{
    await pool.query(`INSERT INTO messages (title, body, username, user_id, animal)
      VALUES ($1, $2, $3, $4, $5);`, [req.body.title, req.body.body, req.user.username, req.user.id, req.user.animal])
      
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
    const { secret } = matchedData(req);
    try{
      if (secret === process.env.CLUB_SECRET) {
        await pool.query(`UPDATE users SET is_member = true WHERE id = $1`, [req.user.id])
        res.render("congratulations", {role: "member" , user : req.user });
      }else if (secret === process.env.ADMIN_SECRET) {
        await pool.query(`UPDATE users SET is_member = true WHERE id = $1`, [req.user.id])
        await pool.query(`UPDATE users SET is_admin = true WHERE id = $1`, [req.user.id])
        res.render("congratulations", {role: "admin" , user : req.user });
      }
      
    }catch(err){
      res.redirect("/")
    } 
  }
]

module.exports= {
  processSecretCode,
  addMessage
}