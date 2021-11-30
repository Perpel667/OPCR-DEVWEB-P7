const sql = require("../config/db");
const jwt = require('jsonwebtoken');

exports.createComment =(req, res,next) => {

    // get user's id from token
    let userid;
   const token = req.cookies.jwt;
   jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken) =>{
       if(err){
           res.status(200).json({message: "no token"})
       }
     userid = decodedToken.id
   })
   // get postId from params
    const postId = req.params.id;

    const sqlCreateComment = `INSERT INTO comments (post_id,user_id,message) VALUES(${postId}, ${userid},'${req.body.message}')`
    sql.query(sqlCreateComment,(err,data) =>{
        if(err){
            console.log(err);
            res.status(404).json({err:err})
        }
        res.status(201).json(data)
    })

}

exports.getAllComment =(req, res,next) => {
   // get postId from params
    const postId = req.params.id;

    const sqlGetAllComment = `SELECT * FROM comments WHERE post_id = ${postId};`
    sql.query(sqlGetAllComment,(err,data) =>{
        if(err){
            console.log(err);
            res.status(404).json({err:err})
        }
        res.status(200).json(data)
    })

}