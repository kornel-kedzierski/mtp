'use strict';

var di = require(__dirname + '/../../../bootstrap')('api')
    , debug = require('debug')('services/trade_message/publish')
    ;

describe('services/trade_message/publish', function () {
    it("publish message", function (done) {
        var tradeMessage = di.get('trade_message');

        tradeMessage.publisher.connect(function () {
            tradeMessage.create({a: 1}, function () {
                debug('args', arguments);

                setTimeout(function () {
                    tradeMessage.publisher.disconnect();
                    done();
                }, 100);
            });
        });
    });
});
