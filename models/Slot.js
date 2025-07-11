const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


// Represents a slot created by the professor
const slotSchema = new Schema({
    professorId:{
        type: ObjectId,
        ref:'User',             // Refers to the professor who owns the slot
        required: true
    },
    name:{
        type:String,            // Professor's name
        required:true
    },
    slotTime:{
        type:Date,              // Time of the slot (ISO format)
        required:true
    },
    isBooked:{
        type:Boolean,           // Indicates whether the slot is booked or not
        default:false
    }
},{
    timestamps: true            // Adds createdAt and updatedAt fields
})

// The Slot Model to interact with the 'Slot' collection
const Slot = mongoose.model('Slot', slotSchema)

module.exports = Slot