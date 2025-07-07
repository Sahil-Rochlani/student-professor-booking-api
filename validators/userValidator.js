const { z } = require('zod')

const signupSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().toLowerCase().email("Invalid email format"),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
    role: z.enum(['student', 'professor'])
})

const signinSchema = z.object({
    email:z.string().trim().toLowerCase().email("Invalid email format"),
    password: z.string().trim().min(1, "Password is required")
})

module.exports = {
    signupSchema,
    signinSchema
}