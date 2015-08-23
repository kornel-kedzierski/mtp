'use strict';

var DIFactory = require('dependency-injection/DIFactory');
var factory = new DIFactory(__dirname + '/config/services.js');

var di = factory.create();