'use strict';

var request = require('request').defaults({strictSSL: false, timeout: 10000})
    , util = require('util')
    , crypto = require('crypto')
    , _ = require('lodash')
    , async = require('async')
    , HOST = 'http://localhost:3000'
    , API_KEY = 'test'
    , SECRET = 'test'
    , N = 10000
    , C = 64
    , di = require(__dirname + '/../bootstrap')('api')
    , security = di.get('security')
    , pairs = {
        'USD/EUR': {
            rateMin: 0.7,
            rateMax: 0.9,
            volumeMin: 100,
            volumeMax: 1000
        },
        'EUR/CAD': {
            rateMin: 1.4,
            rateMax: 1.6,
            volumeMin: 40,
            volumeMax: 300
        }
    }
    ;

function getRequestOptions(currencyPair) {
    var from = currencyPair.split('/').shift()
        , to = currencyPair.split('/').pop()
        , rate = parseFloat(_.random(pairs[currencyPair].rateMin, pairs[currencyPair].rateMax, true).toFixed(5))
        , volume = parseFloat(_.random(pairs[currencyPair].volumeMin, pairs[currencyPair].volumeMax, true).toFixed(2))
        , options = {
            url: util.format('%s/api/v1/trades/messages', HOST),
            originalUrl: '/api/v1/trades/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-timestamp': new Date().getTime(),
                'x-nonce': crypto.randomBytes(32).toString('hex'),
                'x-api-key': API_KEY
            },
            json: true,
            body: {
                userId: _.random(1, 100000),
                currencyFrom: from,
                currencyTo: to,
                amountSell: parseFloat((volume / rate).toFixed(2)),
                amountBuy: volume,
                rate: rate,
                timePlaced: new Date().toISOString(),
                originatingCountry: _.sample(['FR', 'PL', 'US', 'GB'])
            }
        };

    options.headers['x-signature'] = security.getSignature(options, SECRET);

    return options;
}

function prepareData(cnt) {
    var i, data = [];

    for (i = 0; i < cnt; ++i) {
        data.push(_.sample(_.keys(pairs)));
    }

    return data;
}

async.eachLimit(prepareData(N), C, function (currencyPair, next) {
        request(getRequestOptions(currencyPair), function (err, res) {
            console.log('status', res.statusCode);

            next();
        });
    }
    , function (err) {
        console.log('end with err = ', err);
    }
);