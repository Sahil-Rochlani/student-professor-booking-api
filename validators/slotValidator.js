const { z } = require('zod')

// Zod validation schema to check if the requst body
// for creating the slot contains the date and time 
// in string format

const slotSchema = z.object({
    date: z.string(),
    time: z.string()
})

module.exports = slotSchema