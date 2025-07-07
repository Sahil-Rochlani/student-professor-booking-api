const { Router } = require('express')
const { signupController, signinController } = require('../controllers/authController')
const userRouter = Router()
require('dotenv').config()


userRouter.post('/signup', signupController)

userRouter.post('/signin', signinController)

module.exports = userRouter