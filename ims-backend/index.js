import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import cookieParser from "cookie-parser"

dotenv.config()

connectDB()
const app = express()

app.use(cors());
app.use(express.json()) //extract json data out of body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // it allow you to parse the cookie



app.use('/api/auth',userRoute)
app.get("/",(req,res)=>{
    res.send("API working")
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})