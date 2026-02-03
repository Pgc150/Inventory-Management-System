import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
dotenv.config()

connectDB()
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("API working")
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})