require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createPool({
  host: process.env.DBhost,
  user: process.env.DBuser,
  password: process.env.DBpassword,
  database: process.env.DBname,
});



module.exports = connection;