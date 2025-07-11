const Appointment = require("../models/Appointment")
const Slot = require("../models/Slot")
const User = require("../models/User")
const flattenZodError = require("../utils/flattenZodError")
const slotSchema = require("../validators/slotValidator")


//Controller to handle slot creation
exports.createProfessorSlotController = async (req, res) => {
    try{

        // Validating the request body with zod
        const dateTimeValidation = slotSchema.safeParse(req.body)
        if(!dateTimeValidation.success){
            const err_obj = flattenZodError(dateTimeValidation.error)
            return res.status(400).json({error: err_obj})
        }
        const { date, time } = dateTimeValidation.data
        const slotDate = new Date(`${date}T${time}:00Z`)

        // Checking if the date is invalid or is in the past
        if(isNaN(slotDate.getTime())){
            return res.status(400).json({error: "Invalid date/time format"})
        }
        if(slotDate <= Date.now()){
            return res.status(400).json({error: "Slot time must be in the future"})
        }

        // Fetching the professor Id and slot creation
        const professorDetails = await User.findOne({_id: req.user._id})
        const slot = await Slot.create({
            professorId: req.user._id,
            name: professorDetails.name,
            slotTime: slotDate
        })

        const slotObj = slot.toObject()
        delete slotObj.__v

        res.status(200).json({
            message:"Slot created successfully",
            slot: slotObj
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

// Get all the slots created by the professor
exports.getOwnSlotsController = async (req, res) => {
    try{
        const slots = await Slot.find({professorId: req.user._id})

        const trimmedSlots = slots.map(slot => {
            const slotObj = slot.toObject()
            delete slotObj.__v
            return slotObj
        })

        res.status(200).json({slots: trimmedSlots})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }

}

// Controller to handle slot deletion by Id
exports.deleteSlotByIdController = async (req, res) => {
    try{
        const deletedSlot = await Slot.findOneAndDelete({_id:req.params.slotId, professorId: req.user._id})
        if (!deletedSlot) {
            return res.status(404).json({ error: "Slot not found" });
        }
          
        res.status(200).json({ message: "Slot deleted successfully", slot: deletedSlot });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

// Controller to handle retrieval of professor's upcoming appointments
exports.getAppointmentsController = async (req, res) => {
    try{
        const appointments = await Appointment.find().populate([
            {
                path: 'studentId'
            },
            {
                path:'slotId',
            }
        ])

        // Filtering the appointments by professorId and time and mapping the response object
        const filteredAppointments = appointments.filter(app => app.slotId.professorId.toString() === req.user._id.toString() && app.slotId.slotTime >= new Date())
                                                 .map(app => ({
                                                    _id : app._id,
                                                    studentName: app.studentId.name, 
                                                    email:app.studentId.email, 
                                                    time:app.slotId.slotTime
                                                }))
                                
        res.status(200).json({appointments: filteredAppointments})     

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

// Controller to handle appointment cancellation by Id
exports.cancelAppointmentController = async (req, res) => {
    try{
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.appointmentId)
        if(!deletedAppointment){
            return res.status(404).json({error: "Appointment with the given id doesn't exist"})
        }

        // Updating the slot's isBooked to false
        await Slot.findByIdAndUpdate(deletedAppointment.slotId, {isBooked: false})
        res.status(200).json({
            message: "Appointment cancelled successfully",
            deletedAppointment
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}
