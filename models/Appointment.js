const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const appointmentSchema = new Schema({
    studentId: {
        type:ObjectId,
        ref:'User',
        required:true
    },
    slotId:{
        type:ObjectId,
        ref:'Slot',
        required: true
    }
},{
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment