const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.hashedPassword)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({error: 'invalid username or password'})
    }


    req.session.isAuth = true
    res.status(200).send(req.session)
})


module.exports = loginRouter