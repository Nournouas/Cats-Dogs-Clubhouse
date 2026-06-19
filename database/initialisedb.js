const pool = require("./pool");

const startDB = async () => {
  await pool.query(`CREATE TYPE animal_preference AS ENUM ('none', 'dog', 'cat', 'both');`);

  await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      firstname   VARCHAR(30)        NOT NULL,
      lastname    VARCHAR(30)        NOT NULL,
      username    VARCHAR(30)        NOT NULL UNIQUE,
      password    VARCHAR            NOT NULL,
      is_member   BOOLEAN            NOT NULL DEFAULT FALSE,
      animal      animal_preference  NOT NULL DEFAULT 'none'
  );`);

  await pool.query(`CREATE TABLE IF NOT EXISTS messages (
      id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title       VARCHAR(100)       NOT NULL,
      body        VARCHAR(300),
      created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
      user_id     INT                NOT NULL REFERENCES users(id)
  );`);
}

startDB();