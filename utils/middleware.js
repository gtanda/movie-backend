const isAuth = async (req, res, next) => {
    if (req.session.isAuth) {
        next()
    }
    res.redirect('/login')
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {isAuth, unknownEndpoint}
