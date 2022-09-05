const moviesRouter = require('express').Router();
const User = require('../models/user');

moviesRouter.post('/', async (req, res) => {
    const userId = req.session.user.userId;
    const userInDB = await User.findById(userId);

    if (!userInDB) {
        return res.status(400).json({error: 'Login to add movies to watchlist'});
    }

    const video = req.body.data;
    userInDB.watchList = userInDB.watchList.concat(video);
    const savedData = await userInDB.save();

    if (savedData) {
        return res.status(201).json(savedData);
    }
    return res.status(400).json({error: 'Could not saved to watchlist'});
});

moviesRouter.put('/', async (req, res) => {
    const userId = req.session.user.userId;
    const dataToRemove = req.body.dataToRemove;
    const userInDB = await User.findById(userId);

    if (!userInDB) {
        return res.status(400).json({message: 'Login to remove movies from watchlist', messageStatus: 'error'});
    }

    userInDB.watchList = userInDB.watchList.filter(data => data.id !== dataToRemove.id);
    console.log(userInDB.watchList.length);
    await userInDB.save();
    return res.status(201).json({
        message: `Removed ${dataToRemove.title || dataToRemove.name} from watchlist`,
        messageStatus: 'success'
    });
});

moviesRouter.get('/', async (req, res) => {
    const userId = req.session.user.userId;
    const userInDB = await User.findById(userId);
    console.log(userInDB);

    if (!userInDB) {
        return res.status(400).json({error: 'Login to view watchlist'});
    }

    return res.status(200).json(userInDB.watchList);
});

module.exports = moviesRouter;
