'use strict';

module.exports = {
    method: 'get',
    path: '/',
    options: {
        description: 'Ping route',
        tags: ['api'],
        auth: false
    },
    handler: {
        asyncLocal: (request) => {

            const { logReqService } = request.services();

            logReqService.fireOnReq();
            logReqService.logAsyncLocalIsWorking();

            return { pong: new Date().getTime() };
        }
    }
};
