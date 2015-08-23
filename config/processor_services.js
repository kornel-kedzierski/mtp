'use strict';

module.exports = {
    setup: {
        expose: true
    },
    includes: [
        './sections/mongodb.js',
        './sections/rabbit_mq.js'
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
        }
    }
};
