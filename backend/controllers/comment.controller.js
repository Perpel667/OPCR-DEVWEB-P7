const sql = require("../config/db");
const jwt = require('jsonwebtoken');

// get user's id from token
let userid;
const getUserId = (req, res) =>{
   const token = req.cookies.jwt;
   jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken) =>{
       if(err){
           res.status(200).json({message: "no token"})
       }
     userid = decodedToken.id
   })
}

exports.createComment =(req, res,next) => {
    
    getUserId(req,res);
   // get postId from params
    const postId = req.params.id;

    const sqlCreateComment = `INSERT INTO comments (post_id,user_id,message) VALUES(${postId}, ${userid},"${req.body.message}")`
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
exports.updateComment =(req, res,next) => {

     getUserId(req,res);
   // get postId from params
    const commentId = req.params.id;
    sql.query(`SELECT * FROM users WHERE id=${userid}`,(err,userData) =>{
        if(err){
            console.log(err);
            res.status(404).json({ err: err})
        } else {
            sql.query(`SELECT * FROM comments WHERE id = ${commentId}`,(err,data) =>{
                if(err){
                    console.log(err);
                }
                if((data[0].user_id == userid) || userData[0].admin == 1){
                   const sqlUpdateComment = `UPDATE comments SET message='${req.body.message}' WHERE id = ${commentId} AND user_id = ${userid}`
                   sql.query(sqlUpdateComment,(err,result)=>{
                       if (err) {
                           res.status(404).json({ err: err})
                       } else {
                           res.status(201).json(result)
                       }
                   })
                } else {
                    res.status(403).json({message:"vous n'etes pas l'auteur de ce commentaire."})
                }
            })
        }
    })

   
}

exports.deleteComment =(req, res,next) => {

    getUserId(req,res);
  // get postId from params
   const commentId = req.params.id;

   sql.query(`SELECT * FROM users WHERE id=${userid}`,(err,userData) =>{
    if(err){
        console.log(err);
        res.status(404).json({ err: err})
    } else {
        sql.query(`SELECT * FROM comments WHERE id = ${commentId}`,(err,data) =>{
            if(err){
                console.log(err);
            }
            if((data[0].user_id == userid) || userData[0].admin == 1){
               const sqlDeleteComment = `DELETE FROM comments WHERE id = ${commentId}`
               sql.query(sqlDeleteComment,(err,result)=>{
                   if (err) {
                       res.status(404).json({ err: err})
                   } else {
                       res.status(201).json(result)
                   }
               })
            } else {
                res.status(403).json({message:"vous n'etes pas l'auteur de ce commentaire."})
            }
        })
    }
})
};
