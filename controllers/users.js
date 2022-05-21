const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

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
    res.status(201).json(savedUser)
    next()
})




module.exports = usersRouter;