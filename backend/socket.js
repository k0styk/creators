/**---  MIDDLEWARES  ---**/
const socketMiddleware = require('./middleware/socket');

const { socketEvents } = require('../frontend/src/enums');

module.exports = (server) => {
    const { createAdapter } = require('@socket.io/redis-adapter');
    const { createClient } = require('redis');
    const redisHost = process.env['REDIS_HOST'] || 'localhost',
        redisPort = process.env['REDIS_PORT'] || '6379';

    const io = require('socket.io')(server, {
        transports: ['websocket'],
    });

    const pubClient = createClient({ host: redisHost, port: redisPort });
    io.adapter(createAdapter(pubClient, pubClient.duplicate()));
    io.use(socketMiddleware);

    io.on('connection', (socket) => {
        console.log(
            `Socket connected: ${socket.id} - to pid: ${process.env['NODE_APP_INSTANCE']}`
        );
        console.log(socket.request.session);

        /**---  DISCONNECT  ---**/
        socket.on('disconnect', () => {
            console.log('Socket disconnected: ', socket.id);
        });

        return io;
    });
};
