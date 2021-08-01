/**---  MIDDLEWARES  ---**/
const socketMiddleware = require('./middleware/socket');

const { socketEvents } = require('../frontend/src/enums');

const rooms = [
    {
        id: 1,
        name: 'Room1',
    },
    {
        id: 2,
        name: 'Room2',
    },
    {
        id: 3,
        name: 'Room3',
    },
    {
        id: 4,
        name: 'Room4',
    },
    {
        id: 5,
        name: 'Room5',
    },
    {
        id: 6,
        name: 'Room6',
    },
];

module.exports = (server) => {
    const { createAdapter } = require('@socket.io/redis-adapter');
    const { createClient } = require('redis');
    const redisHost = process.env['REDIS_HOST'] || 'localhost',
        redisPort = process.env['REDIS_PORT'] || '6379';

    const options = {
        transports: ['websocket'],
    };
    const io = require('socket.io')(server, options);

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

        // socket.on(events.roomsEvents.get, (cb) => {
        //     cb({
        //         rooms,
        //     });
        // });

        return io;
    });
};
