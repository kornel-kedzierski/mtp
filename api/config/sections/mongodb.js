'use strict';

module.exports = {
    parameters: {
        mongodb: {
            connectionUri: process.env.MONGODB_URI,
            connectionOptions: {},
            modelDir: __dirname + '/../../model'
        }
    }
};