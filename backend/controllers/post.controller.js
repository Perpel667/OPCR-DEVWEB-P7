const sql = require("../config/db");
const jwt = require('jsonwebtoken');


// create a post 
exports.create = (req, res, next) => {
    let file = req;
    if (!file) delete req.body.image_url;
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Veuillez renseignez les champs requis !"
     });
   }
  // get userid from jwt decoded token in cookies
   let userid;
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken) =>{
        if(err){
            res.status(200).json({message: "no token"})
        }
      userid = decodedToken.id
    })

    //create the post object
   const post =  ({
    message : req.body.message,
    user_id : userid,
    date : new Date()
  });
    sql.query("INSERT INTO post SET ?", post, (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.status(400).json({err:err});
        return;
      }
       post_id = result.insertId;
      console.log("Post créer: ", { id: result.insertId, ...post });
      res.status(201).json({ id: result.insertId, ...post });
    });
  
   }; 

 // Get all posts from the database
exports.getAllPosts = (req, res) => {
    const sqlQuery = `SELECT users.id, users.name,users.firstname, post.*, likes.likes
    FROM post
    LEFT JOIN users ON users.id = post.user_id 
    LEFT JOIN likes ON likes.post_id = post.id 
    ORDER BY post.date ASC;`

        sql.query(sqlQuery, (err, result) => {
          if (err) {
            console.log("error: ", err);
            res.status(400).json({error: err});
            return;
          }
           console.log(result); 
          res.status(200).json(result);
        });
      };
  
    
      // update a post
      exports.updatePost = (req, res) => {
        // Validate request
        if (!req.body) {
         res.status(400).send({
           message: "Veuillez renseignez les champs requis !"
         });
       }
       const post = ({
        message : req.body.message,
        date : new Date()
      });
      const postId = req.params.id;
      const sqlQuery = `UPDATE post SET ? WHERE id = ${postId}`;
      sql.query(`SELECT * FROM post WHERE id = ${postId}`,(err, data)=>{
          if (err) {
              console.log(err);
              res.status(400).json({err: err})
          }
          if(data.length){
              sql.query(sqlQuery,post,(err,result)=>{
                  if(err){
                      console.log(err);
                      res.status(400).json({err:err})
                  }
                  res.status(200).json(result)
              })
          } else{
              res.status(404).json({message:"Aucun post trouver avec cet id"})
          }
      })
       };
      
