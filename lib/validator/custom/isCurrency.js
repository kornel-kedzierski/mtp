'use strict';

var _ = require('lodash')
    , currencies = require(__dirname + '/../data/currencies')
    ;

module.exports = function (options) {
    return {
        validate: validate
    };

    function validate(value, onError) {
        if (_.indexOf(currencies, value) === -1) {
            return onError('Invalid currency code');
        }

        return null;
    }
};