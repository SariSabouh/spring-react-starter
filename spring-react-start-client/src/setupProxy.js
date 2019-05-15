// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require('http-proxy-middleware')

// eslint-disable-next-line func-names
module.exports = function (app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use(proxy('/api', { target: 'http://localhost:8080/' }))
    }
}
