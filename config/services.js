'use strict';

module.exports = {
    setup: {
        expose: true
    },
    includes: [
        './sections/mongodb.js',
        './sections/rabbit_mq.js',
        './sections/redis.js',
        './sections/security.js',
        './sections/trade_message.js',
        './sections/validator'
    ],
    parameters: {
        libdir: __dirname + '/../lib'
    },
    services: {
        mongodb: {
            service: '%libdir%/mongodb',
            arguments: ['%mongodb%']
        },
        rabbit_mq: {
            service: '%libdir%/rabbit_mq',
            arguments: ['%rabbit_mq%']
        },
        redis: {
            service: '%libdir%/redis',
            arguments: ['%redis%']
        },
        security: {
            service: '%libdir%/security',
            arguments: ['%security%', '@redis', '@mongodb']
        },
        trade_message: {
            service: '%libdir%/trade_message',
            arguments: ['%trade_message%', '@rabbit_mq']
        },
        validator: {
            service: '%libdir%/validator',
            arguments: ['%validator%']
        }
    }
};

