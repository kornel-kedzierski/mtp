'use strict';

var express = require('express')
    , router = express.Router()
    , di = global.di
    ;

router.post('/', function (req, res, next) {
    var tradeMessage = di.get('trade_message');

    tradeMessage.create(req.body, function (err, result) {
        if (err) {
            return next(err);
        }

        res.send(result, 202); // Accepted for processing
    });
});

module.exports = router;
