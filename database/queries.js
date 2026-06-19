const addNewUser = `INSERT INTO users (firstname, lastname, username, password, animal)
  VALUES ($1, $2, $3, $4, $5) `

module.exports = {
  addNewUser,
}