/**---  MIDDLEWARES  ---**/
const socketMiddleware = require('./middleware/socket');

const { socketEvents } = require('../frontend/src/enums');
const chatController = require('./controllers/chat');

const N_ROOM = 'notification';

module.exports = async (server) => {
  const { createAdapter } = require('@socket.io/redis-adapter');
  const { createClient } = require('redis');
  const redisHost = process.env['REDIS_HOST'] || 'localhost',
    redisPort = process.env['REDIS_PORT'] || '6379';
  const pubClient = createClient({ host: redisHost, port: redisPort });
  const origin = (process.env['ORIGIN'] &&
    process.env['ORIGIN'].split(' ')) || [
    'http://socket.test',
    'http://localhost:3000',
  ];

  const io = require('socket.io')(server, {
    transports: ['websocket'],
    cors: {
      origin,
      methods: ['GET', 'POST'],
      // allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.adapter(createAdapter(pubClient, pubClient.duplicate()));
  // io.use(socketMiddleware);

  const onConnection = (socket) => {
    console.log(
      `Socket connected: ${socket.id} - to pid: ${process.env['NODE_APP_INSTANCE']}`
    );

    /**---  DISCONNECT  ---**/
    socket.on('disconnect', () => {
      console.log('Socket disconnected: ', socket.id);
    });

    socket.on(socketEvents.joinNotificationLobby, (userId) => {
      console.log(userId);
      socket.join(`${N_ROOM}:${userId}`);
      setTimeout(() => {
        console.log('timeout');
        io.to(`${N_ROOM}:${userId}`).emit(socketEvents.joinChat);
      }, 3000);
    });

    // // joined to the room
    // socket.on('join event', chatController.joinChat);

    // // send message to room from user to user in room
    // socket.on('send message event', chatController.sendMessageToChat);

    // // option between users and case in room
    // socket.on('make options event');

    return io;
  };

  io.on('connection', onConnection);
};
