'use strict';

var di = require(__dirname + '/../../../bootstrap')('api')
    , debug = require('debug')('services/trade_message/publish')
    , _ = require('lodash')
    ;

describe('services/trade_message/publish', function () {
    it("publish message", function (done) {
        var tradeMessage = di.get('trade_message');

        tradeMessage.publisher.connect(function () {
            tradeMessage.create({
                userId: 134256,
                currencyFrom: _.sample(['EUR', 'USD']),
                currencyTo: _.sample(['GBP', 'AUD']),
                amountSell: _.random(10, 1000),
                amountBuy:  _.random(10, 1000),
                rate: 0.7471,
                timePlaced: new Date().toISOString(),
                originatingCountry: _.sample(['FR', 'DE', 'US', 'PL'])
            }, function () {
                debug('args', arguments);

                setTimeout(function () {
                    tradeMessage.publisher.disconnect();
                    done();
                }, 100);
            });
        });
    });
});
