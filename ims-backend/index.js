import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoute from './routes/userRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser"

dotenv.config()

connectDB()
const app = express()


app.use(express.json()) //extract json data out of body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // it allow you to parse the cookie
app.use(cors({
    origin:"http://localhost:5173 ",
    credentials:true,
    // origin:"*",
    // credentials:false
}))
app.use('/api/auth',userRoute)
app.use('/api/product',productRoutes)
app.get("/",(req,res)=>{
    res.send("API working")
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})