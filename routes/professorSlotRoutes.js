const { Router } = require('express');
const authorizeRole = require('../middlewares/authorizeRole');
const authenticate = require('../middlewares/authenticate');
const { createProfessorSlotController, getOwnSlotsController, deleteSlotByIdController, cancelAppointmentController, getAppointmentsController } = require('../controllers/professorController');
const professorSlotRouter = Router();
require('dotenv').config()


professorSlotRouter.post('/slots', 
    authenticate,
    authorizeRole('professor'),
    createProfessorSlotController
)

professorSlotRouter.get('/slots', 
    authenticate,
    authorizeRole('professor'),
    getOwnSlotsController
)

professorSlotRouter.delete('/slots/:id', 
    authenticate, 
    authorizeRole('professor'),
    deleteSlotByIdController
)

professorSlotRouter.get('/appointments', 
    authenticate,
    authorizeRole('professor'),
    getAppointmentsController
)

professorSlotRouter.delete('/appointments/:id', 
    authenticate,
    authorizeRole('professor'),
    cancelAppointmentController
)

module.exports = professorSlotRouter