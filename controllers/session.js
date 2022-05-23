const sessionRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {sessionizeUser} = require('../utils/helper')

sessionRouter.post('/', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.hashedPassword)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({error: 'invalid username or password'})
    }

    const sessionUser = sessionizeUser(user)
    req.session.user = sessionUser;
    res.status(200).send(sessionUser);
})

sessionRouter.delete('/', async (req, res) => {
    const user = req.session.user

    if (user) {
        const destroyUser = await req.session.user.destroy()
        console.log(destroyUser)

        res.clearCookie(process.env.SESS_NAME)
        return res.status(200).send(user)
    }
    res.status(422).send({error: 'could not destroy session'})
})


sessionRouter.get("/", async (req, res) => {
    res.status(200).send(req.session.user)
})

module.exports = sessionRouter;