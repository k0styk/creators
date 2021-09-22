/**---  MIDDLEWARES  ---**/
const socketMiddleware = require('./middleware/socket');

const { socketEvents } = require('../frontend/src/enums');

module.exports = async (server) => {
    const { createAdapter } = require('@socket.io/redis-adapter');
    const { createClient } = require('redis');
    const redisHost = process.env['REDIS_HOST'] || 'localhost',
        redisPort = process.env['REDIS_PORT'] || '6379';
    const pubClient = createClient({ host: redisHost, port: redisPort });

    const io = require('socket.io')(server, {
        transports: ['websocket'],
    });

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

        // joined to the room
        socket.on('join event', () => {
            // join room
        });

        // send message to room from user to user in room
        socket.on('send message event', ({ from, to, room }) => {});

        // option between users and case in room
        socket.on('make options event');

        return io;
    });
};