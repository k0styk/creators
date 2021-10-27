/**---  MIDDLEWARES  ---**/
const socketMiddleware = require('./middleware/socket');

const { status, socketEvents } = require('../frontend/src/enums');
const chatController = require('./controllers/chat');

const N_ROOM = 'notification';

module.exports = async (server) => {
  const { createAdapter } = require('@socket.io/redis-adapter');
  const { createClient } = require('redis');
  const redisHost = process.env['REDIS_HOST'] || 'localhost',
    redisPort = process.env['REDIS_PORT'] || '6379';
  const pubClient = createClient({ host: redisHost, port: redisPort });
  const origin = process.env['ORIGIN'] || 'http://localhost:3000';

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

  const notificationNamespace = io.of('/notifications');
  const chatNamespace = io.of('/chat');

  const onConnection = (socket) => {
    console.log(
      `Socket connected: ${socket.id} - to pid: ${process.env['NODE_APP_INSTANCE']}`
    );

    /**---  DISCONNECT  ---**/
    // socket.on('disconnect', () => {
    //   console.log('Socket disconnected: ', socket.id);
    // });

    socket.on(socketEvents.joinNotificationLobby, (userId) => {
      console.log('Joined N_ROOM: ', userId);
      socket.join(`${N_ROOM}:${userId}`);
      //   io.to(`${N_ROOM}:${userId}`).emit(socketEvents.joinChat);
    });

    socket.on(socketEvents.getChats, chatController.getChats);
    socket.on(socketEvents.getChatMessages, chatController.getChatMessages);
    socket.on(socketEvents.sendMessage, async (data, cb) => {
      try {
        await chatController.sendMessageToChat(data);
        cb({ status: status.SUCCESS });
      } catch (e) {
        cb({ status: status.ERROR });
      }
    });
    socket.on(socketEvents.joinChat, (id) => {
      console.log('Joined chat: ', id);
      socket.join(id);
    });
    socket.on(socketEvents.leftChat, (id) => {
      console.log('Left chat: ', id);
      socket.leave(id);
    });

    // // joined to the room
    // socket.on('join event', chatController.joinChat);

    // // send message to room from user to user in room
    // socket.on('send message event', chatController.sendMessageToChat);

    // // option between users and case in room
    // socket.on('make options event');

    return io;
  };

  const onChatConnection = (socket) => {
    // console.log(
    //   `Chat connected: ${socket.id} - to pid: ${process.env['NODE_APP_INSTANCE']}`
    // );

    /**---  DISCONNECT  ---**/
    // socket.on('disconnect', () => {
    //   console.log('Chat disconnected: ', socket.id);
    // });

    socket.on(socketEvents.getChats, chatController.getChats);
    socket.on(socketEvents.getChatMessages, chatController.getChatMessages);
    socket.on(socketEvents.sendMessage, async (data, cb) => {
      try {
        await chatController.sendMessageToChat(data);
        cb({ status: status.SUCCESS });
        const sockets = await chatNamespace.in(data.chatId).fetchSockets();
        if (sockets.length >= 2) {
          socket.to(data.chatId).emit(socketEvents.message, data);
        } else {
          const messageInfo = await chatController.getUserIdMessageTo(data);
          notificationNamespace
            .to(`${N_ROOM}:${messageInfo.userId.toString()}`)
            .emit(socketEvents.message, {
              caseName: messageInfo.caseName,
              userName: messageInfo.userName,
            });
        }
      } catch (e) {
        cb({ status: status.ERROR });
      }
    });

    socket.on(socketEvents.exchangeServices, async (chatId, services) => {
      await chatController.exchangeServices(chatId, services);
      const sockets = await chatNamespace.in(chatId).fetchSockets();
      if (sockets.length >= 2) {
        socket.to(chatId).emit(socketEvents.updateServices, services);
      }
    });

    socket.on(socketEvents.joinChat, (id) => {
      console.log('Joined chat: ', id);
      socket.join(id);
    });
    socket.on(socketEvents.leftChat, (id) => {
      console.log('Left chat: ', id);
      socket.leave(id);
    });
  };

  const onNotificationConnection = (socket) => {
    // console.log(
    //   `Notify connected: ${socket.id} - to pid: ${process.env['NODE_APP_INSTANCE']}`
    // );

    /**---  DISCONNECT  ---**/
    // socket.on('disconnect', () => {
    //   console.log('Notify disconnected: ', socket.id);
    // });

    socket.on(socketEvents.joinNotificationLobby, (userId) => {
      // console.log('Joined N_ROOM: ', userId);
      socket.join(`${N_ROOM}:${userId}`);
    });
  };

  io.on('connection', onConnection);
  chatNamespace.on('connection', onChatConnection);
  notificationNamespace.on('connection', onNotificationConnection);

  // chatNamespace.adapter.on('create-room', (room) =>
  //   console.log(`[${room}] was created`)
  // );

  // chatNamespace.adapter.on('join-room', (room, id) =>
  //   console.log(`[${id}] join room [${room}]`)
  // );

  // chatNamespace.adapter.on('delete-room', (room) =>
  //   console.log(`[${room}] was deleted`)
  // );

  // chatNamespace.adapter.on('leave-room', (room, id) =>
  //   console.log(`[${id}] left room [${room}]`)
  // );
};
