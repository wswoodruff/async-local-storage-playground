'use strict';

const AsyncLocalStorage = require('../utils/als');

module.exports = {
    method: 'get',
    path: '/',
    options: {
        description: 'Ping route',
        tags: ['api'],
        auth: false
    },
    handler: (request) => {

        const { logReqService } = request.services();

        AsyncLocalStorage.run({ req: request }, () => {

            logReqService.fireOnReq();
        });

        return { pong: new Date().getTime() };
    }
};
