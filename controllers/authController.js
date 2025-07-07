const flattenZodError = require('../utils/flattenZodError')
const { signupSchema, signinSchema } = require('../validators/userValidator')
const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// console.log(process.env.MONGO_URI)

exports.signupController = async (req, res) => {
    try{
        const signupValidation = signupSchema.safeParse(req.body)
        if(!signupValidation.success){
            const err_obj = flattenZodError(signupValidation.error)
            return res.status(400).json({error: err_obj})
        }
        const { name, email, password, role} = signupValidation.data

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({error: 'This email is already in use. Please use a different email address or sign in.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(200).json({message: "Sign up successful!"})
    }
    catch(err){
        console.error(err); 

        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

exports.signinController = async (req, res) => {
    try{
        const signinValidation = signinSchema.safeParse(req.body)
        if(!signinValidation.success){
            const err_obj = flattenZodError(signinValidation.error)
            return res.status(400).json({error: err_obj})
        }

        const { email, password } = signinValidation.data

        const existingUser = await User.findOne({email})

        if(!existingUser){
            return res.status(401).json({error: "Invalid email or password."})
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if(!passwordMatch){
            return res.status(401).json({error: "Invalid email or password."})
        }

        const token = jwt.sign({_id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET)

        res.cookie('token', token, { httpOnly: true })

        res.status(200).json({
            message: "Sign in successful!",
            user:{
                _id: existingUser._id,
                name: existingUser.name,
                role: existingUser.role
            }
        })
    }
    catch(err){
        console.log(err)
        
        return res.status(500).json({
            error: "Something went wrong. Please try again later."
        })
    }
}