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
        res.status(400).json({err: err})
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
        res.status(400).json({err: err})
      } else{
        res.status(200).json({message : "Profil modifié"});
      } 
    });
   }
 };

 exports.deleteUser = (req, res) => {
   const userId = req.params.id;
    sql.query("DELETE FROM users WHERE id = ?", userId, (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.status(400).json({err: err})
        return;
      }
      if (result.affectedRows == 0) {
        // not found user with the id
        res.status(404).json({ message : "Aucun profil trouvé pour cet Id" });
        return;
      }
      console.log(`Utilisateur avec l'id ${userId} supprimé`);
      res.status(200).json({ message : "Profil supprimé" });
    });
  };
 
// Modify user's profile picture
exports.updateProfilePicture = (req, res) => {
  // Validate request
  if (!req.body) {
   res.status(400).send({
     message: "Veuillez selectionner une image"
   });
 } else {
  let { body, file } = req;
    const userId = req.params.id;

 const sqlQuery = `UPDATE users SET image='./images/profiles/${file.filename}' WHERE id = ${userId}`;
 sql.query(sqlQuery,(err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({err: err})
    } else{
      res.status(200).json({message : "Photo de profil modifiée"});
    } 
  });
 }
};

 

 