'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('./manifest');
const AsyncLocalLogger = require('../async-local-logger');

exports.deployment = async (start) => {

    const manifest = Manifest.get('/');
    const server = await Glue.compose({
        ...manifest,
        server: {
            ...manifest.server,
            listener: AsyncLocalLogger.createHttpServer()
        }
    }, { relativeTo: __dirname });

    await server.initialize();

    if (!start) {
        return server;
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
