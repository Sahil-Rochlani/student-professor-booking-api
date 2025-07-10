const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");

exports.getAvailableSlotsByProfessorController = async (req, res) => {
    try{
        const slots = await Slot.find({
            professorId: req.params.professorId, 
            isBooked: false, 
            slotTime:{$gte: Date.now()}
        })

        const trimmedSlots = slots.map(slot => ({
            _id: slot._id, 
            name: slot.name, 
            time: slot.slotTime, 
            isBooked: slot.isBooked
        }))
        res.status(200).json({slots: trimmedSlots})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

exports.bookAppointmentController = async (req, res) => {
    try{
        const slot = await Slot.findOneAndUpdate(
            { _id: req.params.slotId, isBooked: false },
            { isBooked: true },
            { new: true }
          );          
        if(!slot){
            return res.status(404).json({error: "The slot with the given id doesn't exist"})
        }

        const appointment = await Appointment.create({
            studentId: req.user._id,
            slotId: req.params.slotId
        })

        const populatedAppointment = await appointment.populate([
            {
                path:'slotId',
                populate: {
                    path: 'professorId',
                    select: 'name email'
                }
            }
        ])

        const trimmedAppointment = {
            _id: populatedAppointment._id, 
            professor: populatedAppointment.slotId.professorId.name, 
            email: populatedAppointment.slotId.professorId.email, 
            slot: populatedAppointment.slotId.slotTime
        }

        res.status(200).json({
            message:"Appointment booked successfully",
            appointment: trimmedAppointment
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}

exports.getStudentAppointmentsController = async (req, res) => {
    try{
        const appointments = await Appointment.find({studentId: req.user._id}).populate([
            {
                path:'slotId',
                populate:{
                    path:'professorId',
                    select:'name email'
                }
            }
        ])
        const response = appointments.filter(app => app.slotId.slotTime >= new Date())
                                     .map(app => ({
                                        _id: app._id,
                                        name: app.slotId.professorId.name,
                                        email: app.slotId.professorId.email,
                                        time: app.slotId.slotTime
                                     }))
    
        res.status(200).json({ appointments: response });
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}
