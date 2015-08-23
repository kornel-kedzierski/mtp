'use strict';

var debug = require('debug')('TradeProcessor')
    , async = require('async')
    ;

/**
 * @param {object} config
 * @param {RabbitMq} messageQueue
 * @param {MongoDb} db
 * @param {Validator} validator
 * @constructor
 */
var TradeProcessor = function (config, messageQueue, db, validator) {
    this.config = config;
    this.messageQueue = messageQueue;
    this.db = db;
    this.validator = validator;
};

TradeProcessor.prototype.init = function (cb) {
    this.messageQueue.subscribe(
        this.config.subscribe,
        this.onMessage.bind(this),
        cb
    );
};

TradeProcessor.prototype.onMessage = function (message, ack) {
    debug('got message', message);

    var self = this;

    async.waterfall([
        function (next) {
            self.validator.run('TradeMessage', message, function (err) {
                if (err) {
                    console.warn('AggregatedTrade:append', err);
                    ack();
                    return;
                }

                next();
            });
        },

        function () {
            self.db.getModel('AggregatedTrade').append({
                    currencyPair: [message.currencyFrom, message.currencyTo].join('/'),
                    normalizedTimestamp: self.normalizeDate(message.timePlaced),
                    volume: message.amountBuy,
                    countryCode: message.originatingCountry
                }
                , function (err, status) {
                    debug('args', arguments);

                    if (err) {
                        console.error('AggregatedTrade:append', err, message);
                        process.exit(1);
                    }

                    ack();
                });
        }
    ]);
};

TradeProcessor.prototype.normalizeDate = function (date) {
    return parseInt(new Date(date).getTime() / this.config.normalizeMs) * this.config.normalizeMs;
};

module.exports = TradeProcessor;