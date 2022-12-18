//express api call krte hai api bnate hai 
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({path: "backend/config/config.env"});
}

//profile pic and url middleware 
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// route imports
const article = require('./routes/articleRoute')
const user = require('./routes/userRoute');
const image = require('./routes/imageRoutes')
const video = require('./routes/videoRoutes')


app.use("/api",article);
app.use("/api",user);
app.use("/api",image);
app.use("/api",video);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build"));
})

//middleware for errors
app.use(errorMiddleware)

module.exports = app