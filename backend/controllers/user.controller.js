const sql = require("../config/db");
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
 

 

 