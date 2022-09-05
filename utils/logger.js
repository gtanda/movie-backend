const ExpressPinoLogger = require('express-pino-logger');

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
            url: req.url
        })
    }
});
