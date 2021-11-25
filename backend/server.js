// dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// DB config & .env

require('dotenv').config({path:'./config/.env'});
require('./config/db');

// server config

const corsOptions = {
    origin : "http://localhost:5000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());


// server
app.listen(process.env.PORT,() => {
    console.log(`Listening on ${process.env.PORT}`);
})

