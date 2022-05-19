const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')

const cors = require('cors')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('error connecting to MongoDB:', err.message)
})

app.use(cors())
app.use(express.json())


app.use('/api/users', usersRouter)

module.exports = app;