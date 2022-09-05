const moviesRouter = require('express').Router();
const User = require('../models/user');

moviesRouter.post('/', async (req, res) => {
    const user = req.body.user;
    const userInDB = await User.findById(user.id);

    if (!userInDB) {
        return res.status(400).json({ error: 'Login to add movies to watchlist' });
    }

    const video = req.body.data;
    userInDB.watchList = userInDB.watchList.concat(video);
    const savedData = await userInDB.save();

    if (savedData) {
        return res.status(201).json(savedData);
    }
    return res.status(400).json({ error: 'Could not saved to watchlist' });
});

moviesRouter.put('/', async (req, res) => {
    const user = req.body.user;
    const dataToRemove = req.body.dataToRemove;
    const userInDB = await User.findById(user.id);

    if (!userInDB) {
        return res.status(400).json({ error: 'Login to remove movies from watchlist' });
    }

    userInDB.watchList = userInDB.watchList.filter(data => data.id !== dataToRemove.id);
    const savedData = await userInDB.save();
    return res.status(201).json(savedData);
});

module.exports = moviesRouter;
