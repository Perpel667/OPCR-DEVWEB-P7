// Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require("../config/db");
require('dotenv').config({path:'./config/.env'})

// Create a user
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
 
 ///////////////
 /*  TOKEN   */
 //////////////
 // durée du token (3jours)
const maxAge = 3 * 24 * 60 * 60 * 1000;
// fonction qui créer le token
 const createToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET,{
     expiresIn :maxAge
   })
 };

 
  // Login
  exports.login = (req, res, next) => {
    // on viens trouver l'utilisateur dans la base de données
    const email = req.body.email;
    const sqlQuery = `SELECT * FROM users WHERE email = '${email}'`
    sql.query(sqlQuery,async (err, data) => {
      if (err) {
        res.status(404).json({error: err})
      } else {
        const match = await bcrypt.compare(req.body.password, data[0].password)
        if(!match){
          res.status(200).json({error:true, message:"Mot de passe incorrect"})
        }
        const token = createToken(data[0].id);
            res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge});
            res.status(200).json({
              userId: data[0].id
            });
      }
      })
    };



module.exports.logout =(req, res) =>{
  console.log('deconnexion');
  res.cookie('jwt','',{maxAge: 1})
  res.redirect('/');
}
