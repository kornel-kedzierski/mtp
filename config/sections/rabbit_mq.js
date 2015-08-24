'use strict';

module.exports = {
    parameters: {
        rabbit_mq: {
            connectionUri: process.env.RABBITMQ_URI || process.env.RABBITMQ_BIGWIG_URL
        }
    }
};