const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");

exports.getAvailableSlotsByProfessorController = async (req, res) => {
    try{
        const slots = await Slot.find({
            professorId: req.params.id, 
            isBooked: false, 
            slotTime:{$gte: Date.now()}
        })
        if(slots.length == 0){
            return res.status(404).json({message: "There are no slots available"})
        }
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
        const slot = await Slot.findById(req.params.id)
        if(!slot){
            return res.status(404).json({error: "The slot with the given id doesn't exist"})
        }
        slot.isBooked = true;
        await slot.save()

        const appointment = await Appointment.create({
            studentId: req.user._id,
            professorId: slot.professorId,
            slotId: req.params.id
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
            professor: populatedAppointment.professorId.name, 
            email: populatedAppointment.email, 
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
        if(appointments.length == 0){
            return res.status(404).json({message: "There are no appointments booked"})
        }
        const upcomingAppointments = appointments.filter(app =>
            new Date(app.slotId.slotTime) >= Date.now()
          );
      
          
        const response = upcomingAppointments.map(app => ({
            _id: app._id,
            name: app.slotId.professorId.name,
            email: app.slotId.professorId.email,
            time: app.slotId.slotTime
        }));
    
        res.status(200).json({ appointments: response });
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}
