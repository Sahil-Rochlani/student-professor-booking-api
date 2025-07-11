const flattenZodError = require('../utils/flattenZodError')
const { signupSchema, signinSchema } = require('../validators/userValidator')
const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

// Controller to handle user registration
exports.signupController = async (req, res) => {
    try{

        // Validating request body using the zod schema
        const signupValidation = signupSchema.safeParse(req.body)
        if(!signupValidation.success){
            const err_obj = flattenZodError(signupValidation.error)
            return res.status(400).json({error: err_obj})
        }
        const { name, email, password, role} = signupValidation.data

        // Check if a user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({error: 'This email is already in use. Please use a different email address or sign in.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        //Adding the user to the Database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(200).json({
            message: "Sign up successful!",
            user:{
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch(err){
        console.error(err); 

        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

// Controller to handle user login
exports.signinController = async (req, res) => {
    try{
        
        // Validating the request body using the zod schema
        const signinValidation = signinSchema.safeParse(req.body)
        if(!signinValidation.success){
            const err_obj = flattenZodError(signinValidation.error)
            return res.status(400).json({error: err_obj})
        }

        const { email, password } = signinValidation.data

        const existingUser = await User.findOne({email})

        // Denying login if there doesn't exist a user with the given email
        if(!existingUser){
            return res.status(401).json({error: "Invalid email or password."})
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        // Denying login if the given passsword is incorrect
        if(!passwordMatch){
            return res.status(401).json({error: "Invalid email or password."})
        }

        // Generating the JWT token and sending it via cookies
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