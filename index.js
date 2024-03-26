// require('dotenv').config({path: './env'}) 
// like above line we can import .env but it distory our code consistancy. because some are in import formate
// and some are require formate.  so we resolve this like below process 
// and in package.json also we made few changes
// i.e "dev": "nodemon src/index.js" insted of this we have to write
//  "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"

import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import { app } from './app.js'

dotenv.config({
    path:'./.env'
})


connectDB()
.then(()=>{

    app.on("error",(error)=>{
        console.log("ERROR Express unable to connect :",error);
        throw error
    })

    app.listen(process.env.PORT || 8000, ()=>{
      console.log(`Server is running at port: ${process.env.PORT}`)  
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed!!!",err);
})















/* this is a one approch in which we write 
db connection in index file */
/* 
import express from "express";
const app = express();

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app in running on port $
            {process.env.PORT}`);
        })

        
    } catch (error) {
        console.error("ERROR:",error)
        throw error
    }
})()

*/
