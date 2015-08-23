'use strict';

var express = require('express')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , app = express()
    , di = global.di
    ;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static('public'));

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
        errors: err.errors || [],
        stack: app.get('env') === 'development' ? err.stack : {}
    });
});

module.exports = app;
