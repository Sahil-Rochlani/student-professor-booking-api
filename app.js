const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const professorSlotRouter = require('./routes/professorSlotRoutes')
const userRouter = require('./routes/userRoutes')
const studentBookingRouter = require('./routes/studentBookingRoutes')


app.use(cookieParser())
app.use(express.json())

app.use('/user', userRouter)
app.use('/professor', professorSlotRouter)
app.use('/student', studentBookingRouter)

module.exports = app