const { Router } = require('express');
const authorizeRole = require('../middlewares/authorizeRole');
const authenticate = require('../middlewares/authenticate');
const { createProfessorSlotController, getOwnSlotsController, deleteSlotByIdController, cancelAppointmentController } = require('../controllers/professorController');
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

professorSlotRouter.delete('/slot/:id', 
    authenticate, 
    authorizeRole('professor'),
    deleteSlotByIdController
)

professorSlotRouter.delete('/appointment/:id', 
    authenticate,
    authorizeRole('professor'),
    cancelAppointmentController
)

module.exports = professorSlotRouter