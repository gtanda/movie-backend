const profileRouter = require('express').Router()
const User = require('../models/user')

profileRouter.get('/:id', async (req, res) => {
    if (!req.session.isAuth) {
        return res.status(401).json({error: 'Not authenticated'})
    }
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(401).json({error: 'User does not exist'})
    }

    res.status(200).send({username: user.username, email: user.email})
})

module.exports = profileRouter;