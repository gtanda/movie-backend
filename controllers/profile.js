const profileRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

profileRouter.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const id = req.session.user.userId;
    const user = await User.findById(id);
    if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
    }

    return res.status(200).send({ username: user.username, email: user.email });
});

profileRouter.patch('/updateUsername', async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ messageStatus: 'error', message: 'Not authenticated' });
    }

    const { username, newUsername } = req.body;

    const userNameIsTaken = await User.findOne({ username: newUsername });
    if (userNameIsTaken) {
        return res.json({ messageStatus: 'error', message: 'Username is taken' });
    }
    if (!userNameIsTaken) {
        const updatedUser = await User.findOneAndUpdate(
            username,
            { username: newUsername },
            { new: true }
        );
        if (updatedUser.username === newUsername) {
            return res.json({
                user: updatedUser,
                messageStatus: 'success',
                message: 'Username updated successfully'
            });
        }
    }

    return res.send({ messageStatus: 'error', message: 'Could not update user' });
});

profileRouter.patch('/updateEmail', async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ messageStatus: 'error', message: 'Not authenticated' });
    }

    const { email, newEmail } = req.body;
    const emailIsTaken = await User.findOne({ email: newEmail });
    if (emailIsTaken) {
        return res.json({ messageStatus: 'error', message: 'Email is taken' });
    }
    if (!emailIsTaken) {
        const updatedUser = await User.findOneAndUpdate(
            email,
            { email: newEmail },
            { new: true }
        );
        return res.json({
            user: updatedUser,
            messageStatus: 'success',
            message: 'Email updated successfully'
        });
    }

    return res
        .status(400)
        .json({ messageStatus: 'error', message: 'Could not update user' });
});

profileRouter.patch('/updatePassword', async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ messageStatus: 'error', message: 'Not authenticated' });
    }

    const { email, newPassword } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.json({ messageStatus: 'error', message: 'User does not exist' });
    }

    if (userExists) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findOneAndUpdate(
            email,
            { hashedPassword },
            { new: true }
        );
        return res.json({
            user: updatedUser,
            messageStatus: 'success',
            message: 'Password updated successfully'
        });
    }

    return res
        .status(400)
        .json({ messageStatus: 'error', message: 'Could not update password' });
});

module.exports = profileRouter;
