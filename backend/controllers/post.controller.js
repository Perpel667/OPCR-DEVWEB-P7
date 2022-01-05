const sql = require("../config/db");
const jwt = require('jsonwebtoken');
const fs = require("fs"); //


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


   exports.create = (req, res, next) => {
    let { body, file } = req;
    if (!file) delete req.body.image_url;
    // get userid from jwt decoded token in cookies
   getUserId(req,res);
   // declare body with user_id we picked up before
    body = {
      message : req.body.message,
      user_id : userid,
    };
  // if there is an image then 
  if (file) {
    const sqlInsertImage = `INSERT INTO post (message,image_url,user_id) VALUES ("${body.message}","${file.filename}", ${userid})`;
    sql.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
    // no image ? then 
  } else {
    const sqlQuery = `INSERT INTO post SET ?`
    sql.query(sqlQuery, body,(err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json({ err });
      }
      res.status(200).json(result);
    })
  }
  };

 // Get all posts from the database
exports.getAllPosts = (req, res) => {
    const sqlQuery = `SELECT users.id, users.name,users.firstname,users.image as 'profilePicture', post.*,(select count(*) from likes WHERE likes.post_id = post.id) as 'Likes',(select count(*) from comments WHERE comments.post_id = post.id) as 'Commentaires'
    FROM post 
    JOIN users ON users.id = post.user_id 
    ORDER BY post.date DESC;`

        sql.query(sqlQuery, (err, result) => {
          if (err) {
            console.log("error: ", err);
            res.status(400).json({error: err});
            return;
          }
           /* console.log(result);  */
          res.status(200).json(result);
        });
      };
  

exports.updatePost = (req, res, next) => {
  let { body, file } = req;
  if (!file) delete req.body.image_url;
 // declare body with user_id we picked up before
  body = {
    message : req.body.message,
  };
  const postId = req.params.id;
// if there is an image then 
sql.query(`SELECT * FROM post WHERE id = ${postId}`,(err, data) =>{
  if (err) {
    console.log(err);
    res.status(404).json({ err })
  }
  if(data.length){
    if (file) {
      // get previous Image & Delete it from server.
      const previousImg = data[0].image_url;
       fs.unlink(`./images/posts/${previousImg}`, err =>{
        if(err){
          console.log(err);
        } console.log("Image supprimée du serveur.");
      }) 
      const sqlInsertImage = `UPDATE post SET message = "${req.body.message}", image_url = "${file.filename}" WHERE id = ${req.params.id}`;
      sql.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
      // no image ? then 
    } else {
      const sqlQuery = `UPDATE post SET ? WHERE id = ${postId}`
      sql.query(sqlQuery,body,(err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
        }
        res.status(200).json(result);
      })
    }
  }else {
    res.status(404).json({message:"Aucun post trouver avec cet id."})
  }
})

};

// delete post
exports.deletePost = (req, res) => {
  sql.query(`SELECT * FROM post WHERE id = ${req.params.id}`,(err,data)=>{
    if (err) {
      console.log(err);
      res.status(400).json({ err : err})
    } else if(data[0].image_url) {
      fs.unlink(`./images/posts/${data[0].image_url}`, err=>{
        if (err) {
          console.log(err);
        }else{
          console.log("Image supprimée du serveur");
        }
      })
    }
  })
     const sqlQuery = `DELETE FROM post WHERE id = ?`
        sql.query(sqlQuery, req.params.id, (err, result) => {
          if (err) {
            console.log("error: ", err);
            res.status(400).json({err:err});
            return;
          }
          if (result.affectedRows == 0) {
            res.status(404).json({message: "aucun post trouver avec cet id."});
            return;
          }
          console.log(`le post avec l'id ${req.params.id} a été supprimé`);
          res.status(200).json({message:"Post supprimé"});
        });
}


// like or unlike a post
exports.likeUnlikePost = (req, res) => {
// get userid from jwt decoded token in cookies
getUserId(req,res);
const postId = req.params.id;
const sqlSelectComment = `SELECT * FROM likes WHERE user_id = ${userid} AND post_id = ${postId}`;
  sql.query(sqlSelectComment,(err,data)=>{
    if (err) {
      console.log(err);
      res.status(404).json({ err:err })
    }
    if(data.length === 0){
      const sqlInsertComment = `INSERT INTO likes (user_id,post_id) VALUES (${userid}, ${postId})`;
      sql.query(sqlInsertComment,(err,result)=>{
        if (err) {
          console.log(err);
          res.status(404).json({ err:err })
        }
        res.status(200).json(result)
      })
    } else {
      const sqlDeleteComment = `DELETE FROM likes WHERE user_id = ${userid} AND post_id = ${postId}`;
      sql.query(sqlDeleteComment, (err, result)=>{
        if (err) {
          console.log(err);
          res.status(404).json({ err:err})
        }
        res.status(200).json(result);
      })
    }
  })
}

// get how many likes a post have

exports.getLikes = (req, res) => {
  const postId = req.params.id;
  const sqlTotalLikes = `SELECT likes.post_id as 'LikePostId', likes.user_id as 'likeUserId' FROM likes;`
  sql.query(sqlTotalLikes, (err, result)=>{
    if (err) {
      console.log(err);
      res.status(404).json({ err:err})
    }
    res.status(200).json(result)
  })
}
// check if user already liked a post
exports.checkLiked = (req, res) => {
  getUserId(req,res);
  const postId = req.params.id;
  const sqlTotalLikes = `SELECT * FROM likes WHERE user_id = ${userid} AND post_id = ${postId}`
  sql.query(sqlTotalLikes, (err, result)=>{
    if (err) {
      console.log(err);
      res.status(404).json({ err:err})
    }
    res.status(200).json(result)
  })
}
