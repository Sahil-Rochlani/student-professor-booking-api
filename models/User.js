const mongoose = require('mongoose')

const Schema = mongoose.Schema


// Schema for a user of the system (either a professor or a student)
const userSchema = new Schema({
    name:{
        type:String,                    // User's name
        required:true
    },
    email:{
        type: String,                   // User's Email Id
        required:true,
        unique: true
    },
    password:{
        type:String,                    // User's password
        required:true
    },
    role:{
        type:String,
        enum: ['professor', 'student'], //  Defines if user is a professor or student
        required: true
    }
},{
    timestamps: true                    // Adds createdAt and updatedAt fields
})

// User Model to interact with the 'User' collection
const User = mongoose.model('User', userSchema)

module.exports = User