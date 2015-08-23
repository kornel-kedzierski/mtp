'use strict';

var _ = require('lodash')
    , countries = require(__dirname + '/../data/countries')
    ;

module.exports = function (options) {
    return {
        validate: validate
    };

    function validate(value, onError) {
        if (_.indexOf(countries, value) === -1) {
            return onError('Invalid country code');
        }

        return null;
    }
};