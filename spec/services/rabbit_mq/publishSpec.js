'use strict';

var di = require(__dirname + '/../../../bootstrap')('api')
    , debug = require('debug')('services/rabbitmq/publish')
    ;

describe('services/rabbitmq/publish', function () {
    it("publish message", function (done) {
        var rabbit = di.get('rabbit_mq');

        rabbit.connect(function (err) {
            if (err) {
                return done(err);
            }

            rabbit.publish({queueName: 'test', data: {date: new Date().getTime()}});

            setTimeout(function () {
                rabbit.disconnect();
                done();
            }, 100);
        });
    });
});
