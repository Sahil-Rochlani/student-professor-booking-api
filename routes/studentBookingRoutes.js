const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorizeRole');
const { getAvailableSlotsByProfessorController, bookAppointmentController, getStudentAppointmentsController } = require('../controllers/studentController');
const studentBookingRouter = Router();
require('dotenv').config()

// Route to view available slots of a specific professor
studentBookingRouter.get('/professor/:professorId/slots', 
    authenticate,
    authorizeRole('student'),
    getAvailableSlotsByProfessorController
)

// Route to book a specific slot
studentBookingRouter.post('/slots/:slotId/book', 
    authenticate,
    authorizeRole('student'),
    bookAppointmentController
)

// Route to view student's own booked appointments
studentBookingRouter.get('/appointments', 
    authenticate,
    authorizeRole('student'),
    getStudentAppointmentsController
)

module.exports = studentBookingRouter