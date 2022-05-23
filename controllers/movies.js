const moviesRouter = require('express').Router()
const axios = require('axios')

moviesRouter.get('/', async (req, res) => {
    const searchType = req.url.split('=')[1]
    const trending = await axios.get(`https://api.themoviedb.org/3/trending/${searchType}/day?api_key=${process.env.API_KEY}`);
    res.status(200).json(trending.data);
})

module.exports = moviesRouter;