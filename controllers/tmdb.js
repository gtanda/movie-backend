const tmdbRouter = require('express').Router();
const axios = require('axios');

tmdbRouter.get('/', async (req, res) => {
    const searchType = req.url.split('=')[1];
    const trending = await axios.get(`https://api.themoviedb.org/3/trending/${searchType}/day?api_key=${process.env.TMDB_API}`);
    return res.status(200).json(trending.data);
});

tmdbRouter.get('/search', async (req, res) => {
    const query = req.url.split('=')[1].trim();
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API}&query=${query}`);
    if (search.data.results.length === 0) {
        return res.status(404).json({ message: 'No results found'});
    }
    return res.status(200).json(search.data);
});

module.exports = tmdbRouter;
