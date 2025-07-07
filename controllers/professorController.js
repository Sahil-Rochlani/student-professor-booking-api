const Slot = require("../models/Slot")
const User = require("../models/User")
const flattenZodError = require("../utils/flattenZodError")
const slotSchema = require("../validators/slotValidator")

exports.createProfessorSlotController = async (req, res) => {
    try{
        const dateTimeValidation = slotSchema.safeParse(req.body)
        if(!dateTimeValidation.success){
            const err_obj = flattenZodError(dateTimeValidation.error)
            return res.status(400).json({error: err_obj})
        }
        const { date, time } = dateTimeValidation.data
        const slotDate = new Date(`${date}T${time}:00Z`)
        if(isNaN(slotDate.getTime())){
            return res.status(400).json({error: "Invalid date/time format"})
        }
        if(slotDate <= Date.now()){
            return res.status(400).json({error: "Slot time must be in the future"})
        }
        const professsorDetails = await User.findOne({_id: req.user._id})

        const slot = await Slot.create({
            professorId: req.user._id,
            name: professsorDetails.name,
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

exports.getOwnSlotsController = async (req, res) => {
    try{
        const slots = await Slot.find({professorId: req.user._id})

        if(slots.length === 0) {
            return res.status(404).json({ message: "No slots found for this professor." });
        }

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

exports.deleteSlotByIdController = async (req, res) => {
    try{
        const deletedSlot = await Slot.findByIdAndDelete(req.params.id)
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

exports.cancelAppointmentController = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.'
        });
    }
}
