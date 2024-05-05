import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

// this function is for the database connection 

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n MONGODB connected !! DB Host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB Connection error", error);
        process.exit(1);
    }
}

export default connectDB