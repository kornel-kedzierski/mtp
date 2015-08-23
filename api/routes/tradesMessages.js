'use strict';

var express = require('express')
    , router = express.Router()
    , debug = require('debug')('route /api/v1/trades/messages')
    , di = global.di
    ;

router.post('/', function (req, res, next) {
    var tradeMessage = di.get('trade_message');

    tradeMessage.create(req.body, function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(202).send(result); // Accepted for processing
    });
});

module.exports = router;
