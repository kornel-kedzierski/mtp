'use strict';

module.exports = {
    parameters: {
        candlestick_subscriber: {
            subscribe: {
                queueName: 'new_candlesticks',
                queueOptions: {durable: true, autoDelete: false},
                subscribeOptions: {ack: true, prefetchCount: 1}
            }
        }
    }
};