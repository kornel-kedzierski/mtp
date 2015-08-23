'use strict';

module.exports = {
    parameters: {
        rabbit_mq: {
            connectionUri: process.env.RABBITMQ_URI
        }
    }
};