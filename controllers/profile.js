const profileRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');

profileRouter.get('/', async (req, res) => {
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

profileRouter.patch('/updateUsername', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({error: 'Not authenticated'})
    }

    let {username, newUsername} = req.body;

    const userNameIsTaken = await User.findOne({username: newUsername});
    if (!userNameIsTaken) {
        const updatedUser = await User.findOneAndUpdate(username, {username: newUsername}, {new: true})
        return res.status(204);
    }

    return res.status(400).json({error: 'Could not update user'});
})

profileRouter.patch('/updateEmail', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({error: 'Not authenticated'})
    }

    let {email, newEmail} = req.body;

    const emailIsTaken = await User.findOne({email: newEmail});
    if (!emailIsTaken) {
        const updatedUser = await User.findOneAndUpdate(email, {email: newEmail}, {new: true})
        return res.status(204);
    }

    return res.status(400).json({error: 'Could not update user'});
})

profileRouter.patch('/updatePassword', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({error: 'Not authenticated'})
    }

    let {email, newPassword} = req.body;

    const userExists = await User.findOne({email});
    console.log(userExists)
    if (userExists) {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUser = await User.findOneAndUpdate(email, {hashedPassword}, {new: true})
        return res.status(204);
    }

    return res.status(400).json({error: 'Could not update user'});
})




module.exports = profileRouter;