const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


// Represents a booked appointment between a student and a professor
const appointmentSchema = new Schema({
    
    studentId: {
        type:ObjectId,
        ref:'User',           // Reference to the student in User Model
        required:true
    },
    slotId:{
        type:ObjectId,
        ref:'Slot',           // Reference to the booked slot in Slot Model
        required: true
    }
},{
    timestamps: true          // Adds createdAt and updatedAt fields
})

// The Appointment model to interact with the 'Appointment' collection
const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment