import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongododb connected")
    } catch (error) {
        console.error("error in mongodb connecion:",error.message)
    }
}