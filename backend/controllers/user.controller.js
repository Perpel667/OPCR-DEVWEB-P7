const sql = require("../config/db");
const bcrypt = require('bcrypt');
require('dotenv').config({path:'./config/.env'})

// Get one specific user from the database
 exports.findOne = (req, res) => {
   // Getting id from params
   const sqlQuery = `SELECT * FROM users WHERE id = ?`
   sql.query(sqlQuery,req.params.id, (err, data) => {
     if (data.length === 0) {
         res.status(404).send({
           message: `Aucun n'utilisateur trouvé avec l'id : ${req.params.id}.`
         });
     }
     delete data[0].password;
      res.status(200).json(data[0]);
   });
 };
 
   // Modify user's profile
   exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Veuillez renseignez les champs requis !"
     });
   }
   if(req.body.password){
       // crypting & hashing pwd with 10* salt
 bcrypt.hash(req.body.password,10)
 // get req.body & include hashed pwd into the modified user
 .then(hash => {
   const user = ({
       email: req.body.email,
       firstname: req.body.firstname,
       name: req.body.name,
       password : hash
   });
   // save the new user's data in the database
   const userId = req.params.id;
   const sqlQuery = `UPDATE users SET ? WHERE id = ${userId}`;
   sql.query(sqlQuery,user,(err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json({err: err})
      } else{
        console.log(data);
        res.status(200).json({message : "Profil modifié"});
      } 
    });
})
   } else {
     const user = ({
       ...req.body
     })
      const userId = req.params.id;
   const sqlQuery = `UPDATE users SET ? WHERE id = ${userId}`;
   sql.query(sqlQuery,user,(err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json({err: err})
      } else{
        res.status(200).json({message : "Profil modifié"});
      } 
    });
   }
 };



 

 