const { Pool } = require("pg");
require('dotenv').config();
 
module.exports = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'postgres',
  password: process.env.DB_PASS,  
  port: 5432,
})
