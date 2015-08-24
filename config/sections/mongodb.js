'use strict';

module.exports = {
    parameters: {
        mongodb: {
            connectionUri: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
            connectionOptions: {},
            modelDir: __dirname + '/../../model'
        }
    }
};