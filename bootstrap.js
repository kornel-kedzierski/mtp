'use strict';

var util = require('util');

try {
    require(__dirname + '/setEnvironment');
}
catch (err) {
}

module.exports = function (appName) {
    var DIFactory = require('dependency-injection/DIFactory');
    var factory = new DIFactory(util.format(__dirname + '/config/%s_services.js', appName));

    return factory.create();
};