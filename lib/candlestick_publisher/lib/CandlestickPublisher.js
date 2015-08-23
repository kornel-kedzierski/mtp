'use strict';

var schedule = require('node-schedule')
    , async = require('async')
    , _ = require('lodash')
    , debug = require('debug')('CandlestickPublisher')
    ;

/**
 * @param {object} config
 * @param {RabbitMq} publisher
 * @param {MongoDb} db
 * @constructor
 */
var CandlestickPublisher = function (config, publisher, db) {
    this.config = config;
    this.publisher = publisher;
    this.db = db;
};

CandlestickPublisher.prototype.init = function () {
    debug('init');

    var self = this;

    schedule.scheduleJob({second: 0}, function () {
        debug('pre publish');
        self.publish();
    });
};

/**
 * @param [cb]
 */
CandlestickPublisher.prototype.publish = function (cb) {
    debug('publish');

    cb = _.isFunction(cb) ? cb : function () {
    };

    var self = this;

    async.waterfall([
        function (next) {
            var Candlestick = self.db.getModel('Candlestick');

            Candlestick
                .find({
                    timestamp: Candlestick.normalizeDate(new Date().getTime() - 60 * 1000)
                })
                .select({_id: 0})
                .exec(function (err, results) {
                    debug('result', arguments);

                    if (err) {
                        return next(err);
                    }

                    return next(null, results);
                })
        },

        function (results, next) {
            if (_.isEmpty(results)) {
                return next();
            }

            debug('publish', results);

            self.publisher.publish({
                queueName: self.config.queueName,
                data: results,
                options: {
                    deliveryMode: 2
                }
            }, next);
        }
    ], cb);
};

module.exports = CandlestickPublisher;
