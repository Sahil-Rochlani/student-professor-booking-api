const { Router } = require('express')
const { signupController, signinController } = require('../controllers/authController')
const userRouter = Router()
require('dotenv').config()

// Route to handle user registration
userRouter.post('/signup', signupController)

// Route to handle user login
userRouter.post('/signin', signinController)

module.exports = userRouter