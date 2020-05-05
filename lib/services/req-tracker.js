'use strict';

const Schmervice = require('schmervice');
const AsyncLocalStorage = require('../utils/als');
const Logger = require('../../async-local-logger');

module.exports = class LogReqService extends Schmervice.Service {

    fireOnReq() {

        const { req } = AsyncLocalStorage.getStore() || {};

        console.log('req', req);
    }

    logAsyncLocalIsWorking() {

        Logger.log(['async-local'], 'The logger is working');
    }
};
