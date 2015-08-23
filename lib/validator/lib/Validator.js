'use strict';

var validator = require('node-validator')
    , util = require('util')
    , debug = require('debug')('Validator')
    ;

var Validator = function (config) {
    this.config = config;
};

Validator.prototype.middleware = function (name) {
    var self = this;

    return function (req, res, next) {
        self.run(name, req.body, next);
    };
};

Validator.prototype.run = function (name, obj, cb) {
    var check
        , schemaPath = util.format(__dirname + '/../objects/%s', name);

    try {
        check = require(schemaPath);
    }
    catch (err) {
        debug('err', err, schemaPath);
        return cb(new Error('Check file not found'));
    }

    validator.run(check, obj, function (errCnt, errors) {
        debug('after run', arguments);

        if (errCnt > 0) {
            var err = new Error('Validation Errors');
            err.status = 400;
            err.errors = errors;

            return cb(err);
        }

        cb();
    });
};

module.exports = Validator;
