const mysql = require('mysql');
require('dotenv').config({path:'./config/.env'})

const connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database :  "groupomania",
    charset : "utf8mb4",

  });
  
 // open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;