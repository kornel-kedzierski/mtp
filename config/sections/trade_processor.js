'use strict';

module.exports = {
    parameters: {
        trade_processor: {
            subscribe: {
                queueName: 'new_trade_messages',
                queueOptions: {durable: true, autoDelete: false},
                subscribeOptions: {ack: true, prefetchCount: 1}
            },
            normalizeMs: 5000 // ms
        }
    }
};

