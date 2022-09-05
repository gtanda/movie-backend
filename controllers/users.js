const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { sessionizeUser } = require('../utils/helper');

usersRouter.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const username = req.session.user.username;
    const userWatchList = await User.findOne({ username }).populate('watchList');
    console.log('userWatchList', userWatchList);
    if (userWatchList.watchList) {
        return res.status(200).json(userWatchList.watchList);
    }
    return res.status(404).json({ error: 'User has no watchlist' });
});

usersRouter.post('/', async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(403).json({ error: "Passwords don't match" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ error: 'Username is taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, hashedPassword });

    const savedUser = await user.save();
    const sessionUser = sessionizeUser(savedUser);

    req.session.user = sessionUser;
    return res.status(201).json(sessionUser);
});

module.exports = usersRouter;
