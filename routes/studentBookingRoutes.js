const { Router } = require('express')
const studentBookingRouter = Router();
require('dotenv').config()

studentBookingRouter.get('/appointments', (req, res) => {

})

studentBookingRouter.post('/book', (req, res) => {

})

studentBookingRouter.get('/my-appointments', (req, res) => {

})

module.exports = studentBookingRouter