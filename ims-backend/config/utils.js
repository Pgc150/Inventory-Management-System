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
        maxAge : 7 * 24 * 60 * 1000,
        httpOnly : true, 
        sameSite : "strict",
        secure : process.env.NODE_ENV !== 'development'
    })

    return token;
}