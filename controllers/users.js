const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {sessionizeUser} = require("../utils/helper");

usersRouter.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({error: 'Not authenticated'})
    }

    const username = req.url.split('=')[1]
    const userWatchList = await User.findOne({username}).populate('watchList')

    res.status(200).json(userWatchList);
})

usersRouter.post('/', async (req, res, next) => {
    const {username, email, password, confirmPassword} = req.body
    if (password !== confirmPassword) {
        return res.status(403).json({error: 'Passwords don\'t match'})
    }

    const userExists = await User.findOne({username})
    if (userExists) {
        return res.status(400).json({error: 'Username is taken'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({username, email, hashedPassword})

    const savedUser = await user.save()
    const sessionUser = sessionizeUser(savedUser)

    req.session.user = sessionUser
    res.status(201).json(sessionUser)
})





module.exports = usersRouter;