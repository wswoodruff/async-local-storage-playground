'use strict';

const AsyncLocalStorage = require('../utils/als');

module.exports = {
    method: (route, handler) => {

        return (request, h) => {

            return AsyncLocalStorage.run({ req: request }, async () => {

                return await handler(request, h);
            });
        };
    }
};
