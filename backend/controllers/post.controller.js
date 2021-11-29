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

