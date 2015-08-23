'use strict';

module.exports = {
    setup: {
        expose: true
    },
    includes: [
        './sections/candlestick_publisher.js',
        './sections/mongodb.js',
        './sections/rabbit_mq.js',
        './sections/trade_processor.js',
        './sections/validator'
    ],
    parameters: {
        libdir: __dirname + '/../lib'
    },
    services: {
        candlestick_publisher: {
            service: '%libdir%/candlestick_publisher',
            arguments: ['%candlestick_publisher%', '@rabbit_mq', '@mongodb']
        },
        mongodb: {
            service: '%libdir%/mongodb',
            arguments: ['%mongodb%']
        },
        rabbit_mq: {
            service: '%libdir%/rabbit_mq',
            arguments: ['%rabbit_mq%']
        },
        trade_processor: {
            service: '%libdir%/trade_processor',
            arguments: ['%trade_processor%', '@rabbit_mq', '@mongodb', '@validator']
        },
        validator: {
            service: '%libdir%/validator',
            arguments: ['%validator%']
        }
    }
};
