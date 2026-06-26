const pool = require ("../database/pool");

const selectAllMessages = "SELECT * FROM messages;"

const deleteMessageByID = `DELETE FROM messages WHERE id = $1`

const insertMessage = `INSERT INTO messages (title, body, username, user_id, animal) VALUES ($1, $2, $3, $4, $5);`

const selectFilteredMessages = "SELECT * FROM messages WHERE animal = $1;"

const updateUserMember = `UPDATE users SET is_member = true WHERE id = $1`

const updateUserAdmin = `UPDATE users SET is_admin = true WHERE id = $1`

const addNewUser = `INSERT INTO users (firstname, lastname, username, password, animal) VALUES ($1, $2, $3, $4, $5) `

module.exports = {
  selectAllMessages,
  deleteMessageByID,
  insertMessage,
  selectFilteredMessages,
  updateUserMember,
  updateUserAdmin,
  addNewUser
}