const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const connectStore = require('connect-mongo')
const app = express()
const pino = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')


mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('error connecting to MongoDB:', err.message)
})

const MongoStore = connectStore(session)

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.disable('x-powered-by')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(pino)

app.use(session({
    name: process.env.SESS_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(process.env.SESS_LIFETIME)
    }),
    cookie: {
        samesite: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESS_LIFETIME)
    }
}))

app.use('/api/users', require('./controllers/users'));
app.use('/api/session', require('./controllers/session'));
app.use('/api/profile', require('./controllers/profile'));
app.use('/api/movies', require('./controllers/movies'));
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;
