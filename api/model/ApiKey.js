'use strict';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    ;

var ApiKey = new Schema({
    apiKey: {type: String, required: true, unique: true},
    secret: {type: String, required: true},
    enabled: {type: Boolean, default: true},
    created: {type: Date},
    updated: {type: Date}
});

ApiKey.index({apiKey: 1, enabled: 1});

ApiKey.pre('save', function (next) {
    var now = new Date();

    this.updated = now;

    if ( !this.created ) {
        this.created = now;
    }

    next();
});

module.exports = mongoose.model('ApiKey', ApiKey);
