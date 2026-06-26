const { body } = require("express-validator");

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

const validateCode = [
  body("secret").trim()
  .isAlpha().withMessage("Secret Code does not container numbers")
  .isLength({min: 1})
]

module.exports = {
  validateUser,
  validateCode
}