const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createDB = () => {
  const queryText = 'CREATE DATABASE sendit;';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(25) NOT NULL,
        lastname VARCHAR(25) NOT NULL,
        username VARCHAR(25) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        usertype VARCHAR(15) NOT NULL
      ); CREATE TABLE IF NOT EXISTS
      orders(
        id SERIAL PRIMARY KEY,
        description VARCHAR(25) NOT NULL,
        location VARCHAR(25) NOT NULL,
        destination VARCHAR(25) NOT NULL,
        quantity VARCHAR(15) NOT NULL,
        price VARCHAR(15) NOT NULL,
        orderDate TIMESTAMP NOT NULL,
        senderId int NOT NULL,
        status VARCHAR(25) NOT NULL
      );`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS orders;';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const addForeignKey = () => {
  const queryText = 'ALTER TABLE orders ADD CONSTRAINT user_fk FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE;';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  addForeignKey,
  createDB,
};

require('make-runnable');
