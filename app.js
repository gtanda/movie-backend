const config = require('./utils/config')
const express = require('express')
const ExpressPinoLogger = require('express-pino-logger')
const app = express()
require('express-async-errors')

const cors = require('cors')

const pinoLogger = ExpressPinoLogger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            user: req.raw.user,
        }),
    },
})
app.use(pinoLogger)
const usersRouter = require('./controllers/users')
const moviesRouter = require('./controllers/movies')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('error connecting to MongoDB:', err.message)
})

app.use(cors())
app.use(express.json())


app.use('/api/movies', moviesRouter)
app.use('/api/users', usersRouter)

module.exports = app;
