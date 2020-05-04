'use strict';

module.exports = {
    method: 'get',
    path: '/',
    options: {
        description: 'Ping route',
        tags: ['api'],
        auth: false
    },
    handler: async (request) => {

        const { logReqService } = request.services();

        logReqService.fireOnReq();

        return await { pong: new Date().getTime() };
    }
};
