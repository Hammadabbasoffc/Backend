// require('dotenv').config({path})

import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config(
    {
        path: './env'
    }
)



connectDB()
.then(()=>{

    app.on("error",(err)=>{
        console.log("ERROR", err);
        throw err
    })

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB Connection Failed!!", err);
})














/*

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error)=>{
            console.log("ERROR", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listining on PORT ${process.env.PORT}`);
        })

    }catch(error){
        console.log( 'ERROR:',error)
        throw err
    }
})()

*/