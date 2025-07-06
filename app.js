const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cookieParser())
app.use(express.json())

module.exports = app