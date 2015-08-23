'use strict';

var mongoose = require('mongoose')
    , _ = require('lodash')
    , Schema = mongoose.Schema
    ;

var AggregatedTrade = new Schema({
    currencyPair: {type: String, required: true},
    normalizedTimestamp: {type: Number, required: true},
    volume: {type: Number, required: true},
    countryCode: {type: String, required: true},
    created: {type: Date},
    updated: {type: Date}
});

AggregatedTrade.index({normalizedTimestamp: 1, currencyPair: 1, countryCode: 1});

AggregatedTrade.pre('save', function (next) {
    var now = new Date();

    this.updated = now;

    if (!this.created) {
        this.created = now;
    }

    next();
});

/**
 * @param {object} data
 * @param {string} data.currencyPair
 * @param {string} data.normalizedTimestamp
 * @param {number} data.volume
 * @param {string} data.countryCode
 * @param {function} cb
 */
AggregatedTrade.statics.append = function (data, cb) {
    this.update(
        _.pick(data, 'currencyPair', 'normalizedTimestamp', 'countryCode'),
        {$inc: {volume: data.volume}},
        {upsert: true},
        cb
    );
};

module.exports = mongoose.model('AggregatedTrade', AggregatedTrade);
