const { z } = require('zod')

const slotSchema = z.object({
    date: z.string(),
    time: z.string()
})

module.exports = slotSchema