'use strict';

module.exports = {
    setup: {
        expose: true
    },
    includes: [
        './sections/rabbit_mq.js',
        './sections/candlestick_subscriber.js',
    ],
    parameters: {
        libdir: __dirname + '/../lib'
    },
    services: {
        candlestick_subscriber: {
            service: '%libdir%/candlestick_subscriber',
            arguments: ['%candlestick_subscriber%', '@rabbit_mq']
        },
        rabbit_mq: {
            service: '%libdir%/rabbit_mq',
            arguments: ['%rabbit_mq%']
        }
    }
};

