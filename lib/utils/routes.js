'use strict';

const AsyncLocalStorage = require('./als');

exports.handlerWrapper = (handler) => {

    return (request, h) => {

        return AsyncLocalStorage.run({ req: request }, () => {

            return handler(request, h);
        });
    };
};
