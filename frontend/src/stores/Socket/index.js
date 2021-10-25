import { io } from 'socket.io-client';
import { autorun, observable } from 'mobx';

import { socketEvents } from '../../enums';

class SocketStore {
  // @observable isConnected;
  // @observable socket;
  @observable notifySocket;
  @observable chatSocket;

  constructor({ RouterStore, UserStore }) {
    // this.socket = io(process.env['REACT_APP_API_HOST'], {
    //   withCredentials: true,
    //   transports: ['websocket'],
    // });
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

    this.notifySocket.on(socketEvents.joinNotificationLobby, () => {
      console.log('JOINED NOTIFICATION ROOM');
    });

    this.notifySocket.on(socketEvents.message, (data) => {
      console.log('NOTIFY MESSAGE');
      console.log(data);
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
