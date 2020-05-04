'use strict';

const Schmervice = require('schmervice');
const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

module.exports = class LogReqService extends Schmervice.Service {

    fireOnReq() {

        const { req } = asyncLocalStorage.getStore() || {};

        console.log('req', req);
    }
};
