const status = {
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

const userType = {
  CONSUMER: 1,
  CREATOR: 2,
};

const serviceType = {
  MAIN: 1,
  ADDITIONAL: 2,
};

const authStatusEnum = {
  IS_CHECKING: 1,
  IS_AUTHENTICATED: 2,
  IS_NOT_AUTHENTICATED: 3,
};

const socketEvents = {
  joinNotificationLobby: 'joinNotificationLobby',
  joinChat: 'joinChat',
  getChats: 'getChats',
  sendMessage: 'sendMessage',
};

module.exports = {
  status,
  serviceType,
  authStatusEnum,
  userType,
  socketEvents,
};
