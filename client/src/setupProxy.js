
const proxy = require("http-proxy-middleware");

import { SERVER } from './constants.js'

module.exports = function(app) {
    app.use(proxy('/auth', { target: SERVER }));
};