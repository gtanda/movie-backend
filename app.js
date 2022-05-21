const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const app = express()
const pino = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(pino)

mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('error connecting to MongoDB:', err.message)
})

const store = new MongoDBSession({
    uri: config.MONGODB_URI,
    collection: 'mySessions'
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:  {maxAge: 86400000},
    store
}))


app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))
app.use('/api/profile', require('./controllers/profile'))
app.use('/api/movies', require('./controllers/movies'))
app.use(middleware.unknownEndpoint)

module.exports = app;
