import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

 const dbConnection =() => {
   
    mongoose.connect(process.env.MONGO_URI,{
  
     dbName:"CHATAPP"
    }).then(()=>{
       console.log("Database Connected");
    }).catch((err)=>{
  
        console.log(`SOME ERROR OCCURED WHILE CONNECTING TO DATABASE:${err}`);
     })
  }
  

export default dbConnection