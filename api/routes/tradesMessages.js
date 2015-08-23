'use strict';

var express = require('express')
    , router = express.Router()
    ;


router.post('/', function (req, res, next) {
    res.send({title: 'Trades Messages'});
});

module.exports = router;
