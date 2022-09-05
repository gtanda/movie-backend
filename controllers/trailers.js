const axios = require('axios');
const trailerRouter = require('express').Router();
const url = require('url');

trailerRouter.get('/', async (req, res) => {
    const parsedUrl = new url.URL(req.url, 'http://localhost:3001');

    const trailerInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${parsedUrl + ' trailer'}&key=${process.env.YT_API}`);
    const releaseYear = parsedUrl.searchParams.get('releaseYear');
    const parsedTitle = parsedUrl.searchParams.get('title').split(' ').join('+');

    console.log(parsedTitle, releaseYear);
    for (const trailer of trailerInfo.data.items) {
        const trailerRelease = trailer.snippet.publishedAt.split('-')[0];
        const trailerTitle = trailer.snippet.title.replace(/[^\w\s]/gi, '').toLowerCase();

        if (trailerTitle.includes(parsedTitle) && trailerRelease === releaseYear) {
            return res.status(200).json(trailer);
        }
    }

    return res.status(400).json({ error: 'could not find trailer' });
});

module.exports = trailerRouter;
