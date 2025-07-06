const { Router } = require('express');
const professorSlotRouter = Router();
require('dotenv').config()


professorSlotRouter.post('/slots', (req, res) => {

})

professorSlotRouter.get('/slots', (req, res) => {

})

professorSlotRouter.delete('/slot/:id', (req, res) => {

})

professorSlotRouter.delete('/appointment/:id', (req, res) => {

})

module.exports = professorSlotRouter