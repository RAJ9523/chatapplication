import express from "express"

import cors from "cors"

// import connectDB from "./Connection/connectDb.js"
import cookieParser from "cookie-parser"
import router from "./routes/index.js"
import dotenv from "dotenv"
import { app } from "./socket/index.js"
import server from "./socket/index.js"
import mongoose from "mongoose";


dotenv.config();

app.use(cors({
    origin:true,
    credentials:true,

    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',router);

const dbConnection =() => {
   
    mongoose.connect(process.env.MONGO_URI,{
  
     dbName:"CHATAPP"
    }).then(()=>{
       console.log("Database Connected");
    }).catch((err)=>{
  
        console.log(`SOME ERROR OCCURED WHILE CONNECTING TO DATABASE:${err}`);
     })
  }
// connectDB();
dbConnection();

const PORT = process.env.PORT || 8080
server.listen(PORT,()=>{
    console.log("server running at " + PORT)
})