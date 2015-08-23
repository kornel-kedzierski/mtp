'use strict';

var di = require(__dirname + '/../../../bootstrap')('processor')
    , debug = require('debug')('services/candlestick_publisher/publish')
    ;

describe('services/candlestick_publisher/publish', function () {
    var cp;

    beforeEach(function (done) {
        cp = di.get('candlestick_publisher');

        cp.db.connect(function () {
            cp.publisher.connect(done);
        });
    });

    afterEach(function () {
        cp.publisher.disconnect();
        cp.db.disconnect();
    });

    it("publish message", function (done) {
        cp.publish(done);
    });
});
