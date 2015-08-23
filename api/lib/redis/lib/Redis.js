'use strict';

var redis = require('redis')
    , _ = require('lodash')
    , debug = require('debug')('Redis')
    ;

/**
 * @param {object} config
 * @constructor
 */
var Redis = function (config) {
    this.config = config;
    this.clients = {};

    this.CONST = Object.freeze({
        CLIENT_TYPES: ['std', 'pub', 'sub']
    });
};

Redis.prototype.destroy = function () {
    _.each(this.clients, function (client, type) {
        debug('destroy client', type);
        client.end()
    });
};

/**
 * @param {Object} [params]
 * @param {String} [params.type=std] (std, pub, sub)
 * @return {RedisClient}
 */
Redis.prototype.getClient = function (params) {
    params = params || {};
    params.type = params.type || 'std';

    if (this.CONST.CLIENT_TYPES.indexOf(params.type) === -1) {
        throw new Error('Invalid redis client type');
    }

    if (!_.isEmpty(this.clients[params.type])) {
        debug('Get client from cache', params);
        return this.clients[params.type];
    }

    return this._createClient(params);
};

/**
 * @param {Object} [params]
 * @param {String} [params.type=std] (std, pub, sub)
 */
Redis.prototype._createClient = function (params) {
    var client = redis.createClient(this.config.port, this.config.host, this.config.options);

    this.clients[params.type] = client;

    client.on('error', function (err) {
        console.error('Redis._createClient error', err.stack, params);
    });

    client.on('connect', function () {
        debug('on connect, client.connected', client.connected);
    });

    debug('Creating new client', params);

    return client;
};

module.exports = Redis;