const moviesRouter = require('express').Router()
const axios = require('axios')

moviesRouter.get('/', async (req, res, next) => {
    const trendingMovies = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
    res.status(200).json(trendingMovies.data);
    next()
})

module.exports = moviesRouter;