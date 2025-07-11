const app = require('./app')
const connectDB = require('./config/db')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// Connect to MongoDB and start the server only if DB connection is successful
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}).catch((err) => {
    // Exit process if DB connection fails
    console.error("DB connection failed:", err)
    process.exit(1)
})