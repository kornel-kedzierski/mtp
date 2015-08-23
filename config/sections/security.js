'use strict';

module.exports = {
    parameters: {
        security: {
            timestampMaxDiff: 5 * 60 * 1000,
            nonceExpireTime: 60 * 60 * 1000,
            signatureAlgorithm: 'sha512'
        }
    }
};

