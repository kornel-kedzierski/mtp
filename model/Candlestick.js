'use strict';

var mongoose = require('mongoose')
    , _ = require('lodash')
    , Schema = mongoose.Schema
    ;

var Candlestick = new Schema({
    currencyPair: {type: String, required: true},
    timestamp: {type: Number, required: true},
    open: {type: Number, required: true},
    close: {type: Number, required: true},
    low: {type: Number, required: true},
    high: {type: Number, required: true},
    volume: {type: Number, required: true},
    created: {type: Date},
    updated: {type: Date}
});

Candlestick.index({timestamp: 1, currencyPair: 1});

Candlestick.pre('save', function (next) {
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
 * @param {string} data.timestamp
 * @param {number} data.volume
 * @param {number} data.rate
 * @param {string} data.countryCode
 * @param {function} cb
 */
Candlestick.statics.append = function (data, cb) {
    this.update(
        _.pick(data, 'currencyPair', 'timestamp'),
        {
            $inc: {volume: data.volume},
            $max: {high: data.rate},
            $min: {low: data.rate},
            $setOnInsert: {open: data.rate},
            close: data.rate
        },
        {upsert: true},
        cb
    );
};

Candlestick.statics.normalizeDate = function (date) {
    return parseInt(new Date(date).getTime() / 1000 / 60) * 60;
};

module.exports = mongoose.model('Candlestick', Candlestick);
