'use strict';

var request = require('request').defaults({timeout: 5000})
    , debug = require('debug')('POST /api/v1/trades/messages')
    ;

describe('POST /api/v1/trades/messages', function () {
    it("should accept valid trade message request", function (done) {
        var options = {
            url: 'http://localhost:3000/api/v1/trades/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                userId: 134256,
                currencyFrom: 'EUR',
                currencyTo: 'GBP',
                amountSell: 1000,
                amountBuy: 747.10,
                rate: 0.7471,
                timePlaced: '2015-01-24T10:27:44.310Z',
                originatingCountry: 'FR'
            }
        };

        debug('req', options);

        request(options, function (error, res, body) {

            expect(res.statusCode).toBe(202);

            debug('body', body);

            done();
        });
    });
});
