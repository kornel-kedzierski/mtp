'use strict';

module.exports = {
    setup: {
        expose: true
    },
    "includes": [
        "./sections/rabbit_mq.js",
        "./sections/trade_message.js"
    ],
    parameters: {
        libdir: __dirname + '/../lib'
    },
    services: {
        rabbit_mq: {
            service: '%libdir%/rabbit_mq',
            arguments: ['%rabbit_mq%']
        },
        trade_message: {
            service: '%libdir%/trade_message',
            arguments: ['%trade_message%', '@rabbit_mq']
        }
    }
};

