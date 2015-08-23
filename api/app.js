'use strict';

var express = require('express')
    , path = require('path')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , app = express()
    ;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/v1/trades/messages', require(__dirname + '/routes/tradesMessages'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
