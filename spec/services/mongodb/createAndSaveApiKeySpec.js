'use strict';

var di = require(__dirname + '/../../../bootstrap')('api')
    , debug = require('debug')('services/mongodb/getModel')
    , async = require('async')
    , crypto = require('crypto')
    ;

describe('services/mongodb/getModel', function () {
    it("get ApiKey model", function (done) {
        var mongodb = di.get('mongodb'),
            ApiKeyModel = mongodb.getModel('ApiKey')
            ;

        var data = {
            apiKey: 'apikey' + new Date().getTime(),
            secret: 'secret' + crypto.randomBytes(64).toString('hex')
        };

        async.waterfall([
            function (next) {
                mongodb.connect(next);
            },
            function (next) {
                var ak = new ApiKeyModel(data);
                ak.save(next);
            },

            function (createdObj, cnt, next) {
                expect(createdObj.apiKey).toBe(data.apiKey);
                expect(createdObj.secret).toBe(data.secret);
                expect(cnt).toBe(1);
                ApiKeyModel.findOne({apiKey: createdObj.apiKey}, next);
            },

            function (foundObj, next) {
                expect(foundObj.apiKey).toBe(data.apiKey);
                expect(foundObj.secret).toBe(data.secret);

                next();
            }
        ], function (err) {
            mongodb.disconnect();

            done(err||null);
        });
    });
});
