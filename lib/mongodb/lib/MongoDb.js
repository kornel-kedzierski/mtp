'use strict';

var path = require('path')
    , util = require('util')
    , mongoose = require('mongoose')
    , debug = require('debug')('MongoDb')
    ;

/**
 * @param {object} config
 * @constructor
 */
var MongoDb = function (config) {
    this.config = config;
    this.db = null;
};

/**
 * @param {function} cb
 */
MongoDb.prototype.connect = function (cb) {
    var self = this;

    this.db = mongoose.connect(this.config.connectionUri, this.config.connectionOptions);
    this.db.connection.once('connected', function () {
        debug('connected');
        cb();
    });
    this.db.connection.once('error', function (err) {
        console.error('mongodb error', arguments);
        cb(err);
    });
};

MongoDb.prototype.disconnect = function () {
    this.db.connection.close();
};

MongoDb.prototype.getModel = function (name) {
    var modelDir = path.resolve(this.config.modelDir, name + '.js');

    debug(util.format('try to load model [%s] from %s', name, modelDir));

    try {
        return require(modelDir);
    }
    catch (err) {
        debug('err', err);

        throw new Error(util.format('Model %s is missing', name));
    }
};

module.exports = MongoDb;
