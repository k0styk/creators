import { io } from 'socket.io-client';
import { autorun, observable } from 'mobx';

import { Alert } from '../../routes';
import { socketEvents } from '../../enums';

class SocketStore {
  @observable notifySocket;
  @observable chatSocket;

  constructor({ RouterStore, UserStore }) {
    this.notifySocket = io(
      `${process.env['REACT_APP_API_HOST']}/notifications`,
      {
        withCredentials: true,
        transports: ['websocket'],
      }
    );
    this.chatSocket = io(`${process.env['REACT_APP_API_HOST']}/chat`, {
      autoConnect: false,
      forceNew: true,
      withCredentials: true,
      transports: ['websocket'],
    });
    this.RouterStore = RouterStore || {};
    this.UserStore = UserStore || {};

    this.initSocketEvents();

    autorun(() => this.enterNotificationRoom());
  }

  initSocketEvents = () => {
    this.notifySocket.on('connect', () => {
      console.log('Socket connected: ', this.notifySocket.id);
    });

    this.notifySocket.on(socketEvents.message, (data) => {
      Alert({
        type: 'info',
        title: 'У вас новое сообщение',
        message: `Сообщение по кейсу: ${data.caseName}, от ${data.userName}`,
        duration: 4500,
      });
    });
  };

  enterNotificationRoom = () => {
    if (this.UserStore.userId) {
      this.notifySocket.emit(
        socketEvents.joinNotificationLobby,
        this.UserStore.userId
      );
    }
  };
}

export default SocketStore;
