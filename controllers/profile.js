const profileRouter = require('express').Router()
const User = require('../models/user')

profileRouter.get('/', async (req, res) => {
    console.log('hit route')
    console.log('profile', req.session.user)
    if (!req.session.user) {
        return res.status(401).json({error: 'Not authenticated'})
    }
    const id = req.session.user.userId
    const user = await User.findById(id)
    if (!user) {
        return res.status(401).json({error: 'User does not exist'})
    }

    res.status(200).send({username: user.username, email: user.email})
})

module.exports = profileRouter;