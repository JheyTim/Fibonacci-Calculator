//Express app setup
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const { pgUser, pgHost, pgDatabase, pgPassword, pgPort } = require('./keys');

const app = express();

app.use(cors());
app.use(express.json());

//Postgres client setup
const pgClient = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});

pgClient.on('connect', (client) => {
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});
