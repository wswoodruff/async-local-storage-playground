'use strict';

const AsyncLocalStorage = require('../utils/als');

module.exports = {
    method: (route, handler) => {

        return (request, h) => {

            return AsyncLocalStorage.run({ req: request }, async () => {

                const { logReqService } = request.services();

                logReqService.fireOnReq();

                return await handler(request, h);
            });
        };
    }
};
