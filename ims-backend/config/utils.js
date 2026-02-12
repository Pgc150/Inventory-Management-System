import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const generateToken = (userId,res) => {
    const token = jwt.sign( // creates a token
        {userId}, // payload
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        }
    )

    res.cookie ("jwt", token , { // sends token in cookie
        maxAge : 7 * 24 * 60 * 1000, // 7days
        httpOnly : true, 
        sameSite : "strict",
        secure : false 
    })

    return token;
}