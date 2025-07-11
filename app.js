const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const professorSlotRouter = require('./routes/professorSlotRoutes')
const userRouter = require('./routes/userRoutes')
const studentBookingRouter = require('./routes/studentBookingRoutes')

// Middleware: Parse cookies and incoming JSON requests
app.use(cookieParser())
app.use(express.json())

// Route handlers
app.use('/user', userRouter)                 // Handles sign-in and sign-up
app.use('/professor', professorSlotRouter)   // Professor slot + appointment routes
app.use('/student', studentBookingRouter)    // Student slot viewing + booking routes

module.exports = app