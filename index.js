require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api_key = process.env.API_KEY;
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
app.get('/api/movies', async (req, res) => {
    const trendingMovies = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`
    );
    res.json(trendingMovies.data);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
