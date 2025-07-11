const { Router } = require('express');
const authorizeRole = require('../middlewares/authorizeRole');
const authenticate = require('../middlewares/authenticate');
const { createProfessorSlotController, getOwnSlotsController, deleteSlotByIdController, cancelAppointmentController, getAppointmentsController } = require('../controllers/professorController');
const professorSlotRouter = Router();
require('dotenv').config()

// Route to create a new slot
professorSlotRouter.post('/slots', 
    authenticate,
    authorizeRole('professor'),
    createProfessorSlotController
)

// Route to view professor's own slots
professorSlotRouter.get('/slots', 
    authenticate,
    authorizeRole('professor'),
    getOwnSlotsController
)

// Route to delete a specific slot
professorSlotRouter.delete('/slots/:slotId', 
    authenticate, 
    authorizeRole('professor'),
    deleteSlotByIdController
)

// Route to view your scheduled appointments
professorSlotRouter.get('/appointments', 
    authenticate,
    authorizeRole('professor'),
    getAppointmentsController
)

// Route to cancel a specific appointment
professorSlotRouter.delete('/appointments/:appointmentId', 
    authenticate,
    authorizeRole('professor'),
    cancelAppointmentController
)

module.exports = professorSlotRouter