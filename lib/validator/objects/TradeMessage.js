'use strict';

var validator = require('node-validator')
    , isCountry = require(__dirname + '/../custom/isCountry')
    , isCurrency = require(__dirname + '/../custom/isCurrency')
    ;

var check = validator.isObject()
        .withRequired('userId', validator.isInteger({min: 0}))
        .withRequired('currencyFrom', isCurrency())
        .withRequired('currencyTo', isCurrency())
        .withRequired('amountSell', validator.isNumber({min: 0}))
        .withRequired('amountBuy', validator.isNumber({min: 0}))
        .withRequired('rate', validator.isNumber({min: 0}))
        .withRequired('timePlaced', validator.isDate({format: 'YYYY-MM-DDTHH:mm:ss.SSSZZ'}))
        .withRequired('originatingCountry', isCountry())
    ;

module.exports = check;
