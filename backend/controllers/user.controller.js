// Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require("../config/db");
require('dotenv').config({path:'./config/.env'})


exports.create = (req, res, next) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Veuillez renseignez les champs requis !"
     });
   }
   // crypting & hashing pwd with 10* salt
 bcrypt.hash(req.body.password,10)
 // get req.body & include hashed pwd into the new user
 .then(hash => {
    const user =  ({
        email : req.body.email,
        name : req.body.name,
        firstname : req.body.firstname,
        password : hash
    });
const sqlQuery = "INSERT INTO users SET ?"
sql.query(sqlQuery,user,(err, result) => {
    if (err) {
        console.log("error: ", err);
         res.status(200).json(err.message);
        return;
      }
      res.status(201).json({ message: "Utilisateur créer !" });
      console.log("Utilisateur créer: ", { id: result.insertId, ...user });
})
 })}; 
 