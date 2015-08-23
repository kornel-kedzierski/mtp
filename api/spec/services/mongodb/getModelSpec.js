'use strict';

require(__dirname + '/../../../bootstrap');

var debug = require('debug')('services/mongodb/getModel')
    ;

describe('services/mongodb/getModel', function () {
    it("get ApiKey model", function (done) {
        var ApiKeyModel = di.get('mongodb').getModel('ApiKey');

        debug('ApiKeyModel', ApiKeyModel);

        done();
    });
});
