const profileRouter = require('express').Router()
const middleware = require('../utils/middleware')

profileRouter.get('/', middleware.isAuth, (req, res) => {
    res.status(200);
})

module.exports = profileRouter;