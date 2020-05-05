'use strict';

const Http = require('http');
const { AsyncLocalStorage } = require('async_hooks');
const Toys = require('toys');

const internals = {};

exports.log = (...args) => {

    const { asyncLocal, storeMap } = internals;
    const request = storeMap.get(asyncLocal.getStore());

    if (request) {
        request.log(...args);
    }
};

exports.plugin = {
    name: 'async-local-logger',
    register(srv) {

        srv.ext(Toys.onRequest((request, h) => {

            const { req } = request.raw;
            const { storeMap } = internals;

            storeMap.set(req, request);

            return h.continue;
        }));
    }
};

exports.createHttpServer = (...args) => {

    const srv = Http.createServer(...args);
    const { asyncLocal } = internals;

    (async () => {

        let listener;

        while (!listener) {

            const [event, maybeListener] = await Toys.event(srv, 'newListener', {
                error: false,
                multiple: true
            });

            if (event === 'request') {
                listener = maybeListener;
            }
        }

        srv.on('request', (req, res) => asyncLocal.run(req, listener, req, res));
        srv.off('request', listener);
    })();

    return srv;
};

internals.storeMap = new WeakMap();

internals.asyncLocal = new AsyncLocalStorage();
