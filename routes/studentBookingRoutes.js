const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorizeRole');
const { getAvailableSlotsByProfessorController, bookAppointmentController, getStudentAppointmentsController } = require('../controllers/studentController');
const studentBookingRouter = Router();
require('dotenv').config()

studentBookingRouter.get('/professor/:id/slots', 
    authenticate,
    authorizeRole('student'),
    getAvailableSlotsByProfessorController
)

studentBookingRouter.post('/slots/:id/book', 
    authenticate,
    authorizeRole('student'),
    bookAppointmentController
)

studentBookingRouter.get('/appointments', 
    authenticate,
    authorizeRole('student'),
    getStudentAppointmentsController
)

module.exports = studentBookingRouter