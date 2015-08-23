'use strict';

var crypto = require('crypto')
    , debug = require('debug')('Security')
    , async = require('async')
    , _ = require('lodash')
    ;

/**
 * @param {object} config
 * @param {Redis} cache
 * @param {MongoDb} db
 * @constructor
 */
var Security = function (config, cache, db) {
    this.config = config;
    this.cache = cache;
    this.db = db;
};

/**
 * @return {function}
 */
Security.prototype.secureMiddleware = function (req, res, next) {
    this.isRequestSecure(req, function (err, isSecure, message) {
        if (err) {
            return next(new Error('Internal Server Error'))
        }

        if (!isSecure) {
            err = new Error(message);
            err.status = 403;

            return next(err);
        }

        next();
    });
};

Security.prototype.isRequestSecure = function (req, cb) {
    if (!this.isTimestampValid(req.headers['x-timestamp'])) {
        return cb(null, false, 'Invalid Timestamp');
    }

    var self = this;

    async.waterfall([
        function (next) {
            self.doesNonceExists(req.headers['x-nonce'], function (err, exists) {
                if (err) {
                    return cb(err);
                }

                if (exists) {
                    return cb(null, false, 'Nonce exists');
                }

                next();
            })
        },

        function (next) {
            self.getSecret(req.headers['x-api-key'], function (err, secret) {
                if (err) {
                    return cb(err);
                }

                if (!secret) {
                    return cb(null, false, 'Invalid Api Key');
                }

                if (!self.isSignatureValid(req, secret)) {
                    return cb(null, false, 'Invalid signature')
                }

                next();
            });
        },

        function (next) {
            self.saveNonce(req.headers['x-nonce'], function (err) {
                if (err) {
                    return cb(err);
                }

                next(null, true);
            });
        }

    ], cb);
};

Security.prototype.getSecret = function (apiKey, cb) {
    this.db.getModel('ApiKey').findOne({apiKey: apiKey, enabled: true}, function (err, apiKey) {
        if (err) {
            return cb(err);
        }

        if (!apiKey) {
            return cb(null, null);
        }

        cb(null, apiKey.secret);
    });
};

/**
 * @param {number} timestamp
 * @return {boolean}
 */
Security.prototype.isTimestampValid = function (timestamp) {
    return Math.abs(new Date().getTime() - timestamp) <= this.config.timestampMaxDiff;
};

/**
 * @param {string} nonce
 * @return {string}
 */
Security.prototype.getNonceKey = function (nonce) {
    return ['MarketTradeProcessor', 'API', 'Nonce', nonce].join(':');
};

/**
 * @param {string} nonce
 * @param {function} cb
 */
Security.prototype.saveNonce = function (nonce, cb) {
    var client = this.cache.getClient();

    client.setex(
        this.getNonceKey(nonce),
        parseInt(this.config.nonceExpireTime / 1000),
        1,
        cb
    );
};

/**
 * @param {string} nonce
 * @param {function} cb
 */
Security.prototype.doesNonceExists = function (nonce, cb) {
    var client = this.cache.getClient();

    if (_.isEmpty(nonce)) {
        return cb(null, true);
    }

    client.get(this.getNonceKey(nonce), function (err, value) {
        if (err) {
            return cb(err);
        }

        return cb(null, value == 1);
    });
};

/**
 * @param {ClientRequest} req
 * @param {string} secret
 * @return {boolean}
 */
Security.prototype.isSignatureValid = function (req, secret) {
    return this.getSignature(req, secret) === req.headers['x-signature'];
};

/**
 * @param {ClientRequest} req
 * @param {string} secret
 * @return {string}
 */
Security.prototype.getSignature = function (req, secret) {
    var hmac = crypto.createHmac(this.config.signatureAlgorithm, secret);
    hmac.update(this.serialize(req));

    return hmac.digest('hex');
};

Security.prototype.serialize = function (req) {
    return [
        req.method,
        req.originalUrl,
        req.headers['x-timestamp'],
        req.headers['x-nonce'],
        req.headers['x-api-key'],
        JSON.stringify(req.body)
    ].join('|');
};

module.exports = Security;
