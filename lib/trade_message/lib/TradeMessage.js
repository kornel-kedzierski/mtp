'use strict';

var debug = require('debug')('TradeMessage');

/**
 * @param {object} config
 * @param {RabbitMq} publisher
 * @constructor
 */
var TradeMessage = function (config, publisher) {
    this.config = config;
    this.publisher = publisher;
};

/**
 * @param {object} params
 * @param {number} params.userId - ex. 134256
 * @param {string} params.currencyFrom - ex. EUR
 * @param {string} params.currencyTo - ex. GBP
 * @param {number} params.amountSell - ex. 1000
 * @param {number} params.amountBuy - ex. 747.10
 * @param {number} params.rate - ex. 0.7471
 * @param {string} params.timePlaced - ex. 2015-01-24T10:27:44.310Z ISO time
 * @param {string} params.originatingCountry - ex. FR
 * @param {function} cb
 */
TradeMessage.prototype.create = function (params, cb) {
    debug('create', params);

    this.publisher.publish({
        queueName: this.config.queueName,
        data: params,
        options: {
            deliveryMode: 2
        }
    }, function (err) {
        if (err) {
            return cb(err);
        }

        cb(null, {messageAccepted: true});
    });
};

module.exports = TradeMessage;