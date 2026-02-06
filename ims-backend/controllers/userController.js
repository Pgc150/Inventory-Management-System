import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../config/utils.js'

export const signup = async (req,res) => {
    const {name, email , password} = req.body;

    try {
        if(!name || !email || !password) {
            return res.status(400).json({message : "All fields are required"})
        }

        if(password.length < 6) {
            return res.status(400).json({message:"password must be at east 6 characters"})
        }

        const user = await User.findOne({email}) 

        if(user) return res.status(400).json({message:"Email alredy exists"})
         
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        if(newUser){
            // generate jwt token here
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                name: newUser.name,
                email: newUser.email,
            })
        } else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body

    try {
        if( !email || !password) {
            return res.status(400).json({message : "All fields are required"})
        }

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({message:"Invalid credentials"})
        }

        generateToken(user._id,res) 

        res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
         console.log("Error in login controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const logout = (req,res) => {
    try {
        res.cookie("jwt", " ", {maxAge:0})
        res.status(200).json({message:"Logged out sucessfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getUser = (req,res) => {
    res.status(200).json(req.user)
    console.log("Error is check auth")
}


