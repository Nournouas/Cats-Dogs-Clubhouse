const pool = require("./pool");
const { selectAllMessages, 
        deleteMessageByID,
        insertMessage,
        selectFilteredMessages,
        updateUserMember,
        updateUserAdmin,
        } = require("../utilities/queries")

const startDB = async () => {
  //await pool.query(`CREATE TYPE animal_preference AS ENUM ( 'dog', 'cat', 'both');`);

  await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      firstname   VARCHAR(30)        NOT NULL,
      lastname    VARCHAR(30)        NOT NULL,
      username    VARCHAR(30)        NOT NULL UNIQUE,
      password    VARCHAR            NOT NULL,
      is_member   BOOLEAN            NOT NULL DEFAULT FALSE,
      is_admin    BOOLEAN            NOT NULL DEFAULT FALSE,
      animal      animal_preference  NOT NULL DEFAULT 'both'
  );`);

  await pool.query(`CREATE TABLE sessions (
    sid    VARCHAR        NOT NULL COLLATE "default" PRIMARY KEY,
    sess   JSON           NOT NULL,
    expire TIMESTAMP(6)   NOT NULL
    );
    CREATE INDEX ON sessions (expire);`);


await pool.query(`CREATE TABLE IF NOT EXISTS messages (
      id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title       VARCHAR(100)       NOT NULL,
      body        VARCHAR(300),
      created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
      username     VARCHAR                NOT NULL,
      animal      animal_preference  NOT NULL DEFAULT 'both',
      user_id     INT                NOT NULL REFERENCES users(id)
  );`);
}

const startsession = async () => {
  await pool.query(`CREATE TABLE sessions (
    sid    VARCHAR        NOT NULL COLLATE "default" PRIMARY KEY,
    sess   JSON           NOT NULL,
    expire TIMESTAMP(6)   NOT NULL
    );
    CREATE INDEX ON sessions (expire);`);
  }

const startmessages = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS messages (
      id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title       VARCHAR(100)       NOT NULL,
      body        VARCHAR(300),
      created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
      username     VARCHAR                NOT NULL,
      user_id     INT                NOT NULL REFERENCES users(id)
  );`);
}

const startmembers = async () => {
  await pool.query(`ALTER TABLE messages
  ADD COLUMN animal animal_preference NOT NULL DEFAULT 'both';`);
}

const checkdb = async() => {
   const { rows } = await pool.query("SELECT * FROM users;");
   console.log(rows)
}

checkdb();