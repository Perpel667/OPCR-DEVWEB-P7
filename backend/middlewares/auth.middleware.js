const jwt = require("jsonwebtoken");
const sql = require("../config/db");

module.exports.Auth = (req, res,next) => {
    const token = req.cookies.jwt;
    const sqlQuery = `SELECT id FROM users WHERE id = ?`
    if(!token){
        res.status(404).json({message:"Aucun token fourni."})
    }else{
        jwt.verify(token,process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.status(404).json({message: "Mauvais token fourni."})
            }
            /* console.log(decodedToken.id); */
            sql.query(sqlQuery, decodedToken.id, (err,data) => {
                if(err){
                    res.status(200).json({message : "Aucun utilisateur trouvé avec cet id."})
                }else{
                    next();
                }
            })
        })
    }
  }

  module.exports.requireUserAuth = (req, res,next) => {
    const sqlQuery = `SELECT id FROM users WHERE id = ?`
    const token = req.cookies.jwt;
    sql.query(sqlQuery,req.params.id, (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(404).json({err: err});
            return;
          }
          if (data == 0) {
            // not found User with the id
            res.status(200).json({message : "aucun utilisateur trouvé avec cet id"})
            return;
          } else {
            jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{
                if(err){
                    res.status(404).json({message: "mauvais token"});
                }else{
                   if(decodedToken.id == data[0].id){
                       next();
                   }else{
                    res.status(403).send({
                        message: `Vous n'êtes pas autoriser a faire cette action.`
                      });
                   }
                }
            })
          }
    })
  }

  module.exports.requireAuth = (req, res,next) => {
    const sqlQueryPost = `SELECT * FROM post WHERE id = ?`
    const token = req.cookies.jwt;
   sql.query(sqlQueryPost,req.params.id,(err, data)=>{
       if (err) {
           console.log(err);
           res.status(404).json({message:"Aucun post trouver avec cet id."})
       } else {
           jwt.verify(token,process.env.JWT_SECRET, (err, decodedToken)=>{
               if(err){
                   console.log(err);
                   res.status(400).json({err: err})
               } else {
                   if(data[0].user_id == decodedToken.id){
                       next();
                   } else {
                       res.status(403).json({message:"Vous n'êtes pas autoriser a faire cette action."})
                   }
               }
           })
       }
   })
  }