'use strict';

const RouteUtils = require('../utils/routes');

module.exports = {
    method: 'get',
    path: '/',
    options: {
        description: 'Ping route',
        tags: ['api'],
        auth: false
    },
    handler: RouteUtils.handlerWrapper((request) => {

        const { logReqService } = request.services();

        logReqService.fireOnReq();

        return { pong: new Date().getTime() };
    })
};
