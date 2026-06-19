const { Pool } = require("pg");
 
module.exports = new Pool({
  user: 'postgres',        // or your local user
  host: 'localhost',
  database: 'postgres', // change this
  password: 'nour123',    // if you set one
  port: 5432,
})
