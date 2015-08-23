'use strict';

var url = require('url')
    , config = url.parse(process.env.REDIS_URI)
    ;

module.exports = {
    parameters: {
        redis: {
            port: config.port || 6379,
            host: config.hostname,
            options: {
                auth_pass: String(config.auth).split(':')[1] || null
            }
        }
    }
};