const ExpressPinoLogger = require("express-pino-logger");

module.exports = ExpressPinoLogger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            user: req.raw.user,
        }),
        res: (res) => ({
            method: res.method,
            url: res.url,
            user: res.raw.user
        })
    },
})