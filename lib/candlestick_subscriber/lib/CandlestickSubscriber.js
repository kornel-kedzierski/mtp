'use strict';

/**
 * @param {object} config
 * @param {RabbitMq} subscriber
 * @constructor
 */
var CandlestickSubscriber = function (config, subscriber) {
    this.config = config;
    this.subscriber = subscriber;

    this.io = null;
};

CandlestickSubscriber.prototype.init = function (io, cb) {
    this.io = io;

    this.subscriber.subscribe(
        this.config.subscribe,
        this.onMessage.bind(this),
        cb
    );
};

CandlestickSubscriber.prototype.onMessage = function (message, ack) {
    if (!this.io) {
        return ack();
    }

    this.io.emit('candlesticks', message);

    ack();
};

module.exports = CandlestickSubscriber;