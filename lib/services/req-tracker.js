'use strict';

const Schmervice = require('schmervice');
const AsyncLocalStorage = require('../utils/als');

module.exports = class LogReqService extends Schmervice.Service {

    fireOnReq() {

        const { req } = AsyncLocalStorage.getStore() || {};

        console.log('req', req);
    }
};
