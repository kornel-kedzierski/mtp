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
            var Candlestick = self.db.getModel('Candlestick');

            Candlestick.append({
                    currencyPair: [message.currencyFrom, message.currencyTo].join('/'),
                    timestamp: Candlestick.normalizeDate(message.timePlaced),
                    rate: message.rate,
                    volume: message.amountBuy,
                    countryCode: message.originatingCountry
                }
                , function (err, status) {
                    debug('args', arguments);

                    if (err) {
                        console.error('Candlestick:append', err, message);
                        process.exit(1);
                    }

                    ack();
                });
        }
    ]);
};

module.exports = TradeProcessor;