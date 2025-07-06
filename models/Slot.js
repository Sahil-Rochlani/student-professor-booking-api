const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const slotSchema = new Schema({
    professorId:{
        type: ObjectId,
        ref:'User',
        required: true
    },
    name:{
        type:String,
        required:true
    },
    slotTime:{
        type:Date,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})

const Slot = mongoose.model('Slot', slotSchema)

module.exports = Slot