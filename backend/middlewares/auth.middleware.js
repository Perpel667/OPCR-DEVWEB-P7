const jwt = require("jsonwebtoken");
const sql = require("../config/db");

module.exports = (req, res,next) => {
    const token = req.cookies.jwt;
    const sqlQuery = `SELECT id FROM users WHERE id = ?`
    if(!token){
        res.status(404).json({message:"Aucun token fourni."})
    }else{
        jwt.verify(token,process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.status(404).json({message: "Mauvais token fourni."})
            }
            console.log(decodedToken.id);
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
