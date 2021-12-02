// dependencies
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

// DB config & .env

require('dotenv').config({path:'./config/.env'});
require('./config/db');

// definition des headers
app.use((req, res, next) => {
    // nous permet d'acceder a l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // nous permet d'ajouter les headers mentionnés aux requetes envoyés a l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // nous permet d'envoyer des requetes avec les methodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

// import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

// server config

const corsOptions = {
    origin : ["http://localhost:5000","http://localhost:3001"]
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());


app.use('/api/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);



// server
app.listen(process.env.PORT,() => {
    console.log(`Listening on ${process.env.PORT}`);
})

