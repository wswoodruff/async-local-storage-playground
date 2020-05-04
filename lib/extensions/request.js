'use strict';

const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

const Toys = require('toys');

const internals = {};

module.exports = Toys.onRequest((request, h) => {

    return asyncLocalStorage.run({ req: request }, () => {

        console.log('Running in asyncLocalStorage context');
        return h.continue;
    });
});
