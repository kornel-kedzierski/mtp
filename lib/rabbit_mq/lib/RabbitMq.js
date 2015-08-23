'use strict';

var amqp = require('amqp')
    , async = require('async')
    , _ = require('lodash')
    , debug = require('debug')('RabbitMq')
    ;

/**
 * @param {object} config
 * @constructor
 */
var RabbitMq = function (config) {
    debug('construct');

    this.config = config;
    this.connection = null;
};

/**
 * @param {function} cb
 */
RabbitMq.prototype.connect = function (cb) {
    this.connection = amqp.createConnection({url: this.config.connectionUri});

    this.connection.once('ready', function () {
        debug('connected');
        cb();
        cb = function () {
        }
    });

    this.connection.once('error', function (err) {
        debug('err', err);
        cb(err);
        cb = function () {
        }
    });

    this.connection.once('close', function (err) {
        debug('close', arguments);
        cb(err);
        cb = function () {
        }
    });
};

RabbitMq.prototype.disconnect = function () {
    this.connection.destroy();
};

/**
 * @param {object} params
 * @param {string} params.queueName
 * @param {object} params.data
 * @param {object} [params.options={}]
 * @param {function} cb
 */
RabbitMq.prototype.publish = function (params, cb) {
    debug('publish', params);

    if (!this.connection) {
        return cb(new Error('Publisher disconnected'));
    }

    this.connection.publish(params.queueName, params.data, params.options || {}, function () {
        debug('got callback');
    });

    cb();
};

module.exports = RabbitMq;

