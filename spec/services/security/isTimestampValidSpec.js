'use strict';

var di = require(__dirname + '/../../../bootstrap')('api')
    , debug = require('debug')('services/security/timestamp')
    ;

describe('services/security/timestamp', function () {
    it("asserts on timestamps", function () {
        var security = di.get('security');

        expect(security.isTimestampValid(new Date().getTime())).toBeTruthy();
        expect(security.isTimestampValid(new Date().getTime() - security.config.timestampMaxDiff - 1)).toBeFalsy();
        expect(security.isTimestampValid(new Date().getTime() + security.config.timestampMaxDiff + 1)).toBeFalsy();
    });
});
