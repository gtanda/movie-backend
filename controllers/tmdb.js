const tmdbRouter = require('express').Router();
const axios = require('axios');

tmdbRouter.get('/', async (req, res) => {
    const searchType = req.url.split('=')[1];
    const trending = await axios.get(`https://api.themoviedb.org/3/trending/${searchType}/day?api_key=${process.env.TMDB_API}`);
    console.log('trending data', trending.data);
    return res.status(200).json(trending.data);
});

module.exports = tmdbRouter;
