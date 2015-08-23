'use strict';

var di = require(__dirname + '/../../../bootstrap')('api')
    , debug = require('debug')('services/rabbitmq/subscribe')
    ;

describe('services/rabbitmq/subscribe', function () {
    it("subscribe queue", function (done) {
        var rabbit = di.get('rabbit_mq');

        rabbit.connect(function (err) {
            if (err) {
                return done(err);
            }

            rabbit.subscribe({
                    queueName: 'test',
                    queueOptions: {durable: true, autoDelete: false},
                    subscribeOptions: {ack: true, prefetchCount: 1}
                }
                , function (msg, ack) {
                    debug('got message', msg);

                }, function () {
                    debug('subscribed', arguments);
                });
        });
    });
});
