const moviesRouter = require('express').Router()
const VideoData = require('../models/video')
const User = require('../models/user')

moviesRouter.post('/', async (req, res) => {
  const mediaType = req.body.data.media_type
  const user = req.body.user
  const userInDB = await User.findById(user.id)

  if (!userInDB) {
    return res.status(400).json({ error: 'Login to add movies to watchlist' })
  }

  if (mediaType === 'movie') {
    const { title, id, posterPath } = req.body.data
    const movieToSave = new VideoData({
      title,
      videoID: id,
      posterPath
    })

    const savedMovie = await movieToSave.save()
    userInDB.watchList = userInDB.watchList.concat(savedMovie)
    await userInDB.save()
    return res.status(200).json(savedMovie)
  } else if (mediaType === 'tv') {
    const { name, id, posterPath } = req.body.data
    const showToSave = new VideoData({
      title: name,
      videoID: id,
      posterPath
    })
    const userInDB = await User.findById(user.id)

    const savedShow = await showToSave.save()
    userInDB.watchList = userInDB.watchList.concat(savedShow)
    await userInDB.save()
    return res.status(200).json(savedShow)
  }

  return res.status(400).json({ error: 'Could not saved to watchlist' })
})

module.exports = moviesRouter
