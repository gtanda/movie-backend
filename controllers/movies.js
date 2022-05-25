const moviesRouter = require('express').Router()
const axios = require('axios')
const VideoData = require('../models/video');
const User = require('../models/user');

moviesRouter.get('/', async (req, res) => {
    const searchType = req.url.split('=')[1]
    const trending = await axios.get(`https://api.themoviedb.org/3/trending/${searchType}/day?api_key=${process.env.TMDB_API}`);
    res.status(200).json(trending.data);
})

moviesRouter.post('/', async (req, res) => {
    const mediaType = req.body.data.media_type;
    const user = req.body.user;
    const userInDB = await User.findById(user.id)
    console.log('userini;db', userInDB)

    if (mediaType === 'movie') {
        console.log('got here')
        const {title, id, poster_path} = req.body.data;
        const movieToSave = new VideoData({
            title,
            videoID: id,
            posterPath: poster_path
        })

        const savedMovie = await movieToSave.save();
        userInDB.watchList = userInDB.watchList.concat(savedMovie)
        await userInDB.save();
        return res.status(200).json(savedMovie);
    } else if (mediaType === 'tv') {
        const {name, id, poster_path} = req.body.data
        const showToSave = new VideoData({
            title: name,
            videoID: id,
            posterPath: poster_path
        })
        const userInDB = await User.findById(user.id)

        const savedShow = await showToSave.save();
        userInDB.watchList = userInDB.watchList.concat(savedShow)
        await userInDB.save();
        return res.status(200).json(savedShow);
    }

    return res.status(400).json({error: 'Could not saved to watchlist'})
})

module.exports = moviesRouter;