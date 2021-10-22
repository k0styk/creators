import { io } from 'socket.io-client';
import { autorun, observable } from 'mobx';

import { socketEvents } from '../../enums';

class SocketStore {
  @observable isConnected;
  @observable socket;

  constructor({ RouterStore, UserStore }) {
    this.socket = io(process.env['REACT_APP_API_HOST'], {
      withCredentials: true,
      transports: ['websocket'],
    });
    this.notifySocket = io(
      `${process.env['REACT_APP_API_HOST']}/notifications`,
      {
        withCredentials: true,
        transports: ['websocket'],
      }
    );
    this.RouterStore = RouterStore || {};
    this.UserStore = UserStore || {};

    this.initSocketEvents();

    autorun(() => this.enterNotificationRoom());
  }

  initSocketEvents = () => {
    this.socket.on('connect', () => {
      console.log('Socket connected: ', this.socket.id);
    });

    this.socket.on(socketEvents.joinNotificationLobby, () => {
      console.log('JOINED NOTIFICATION ROOM');
    });
  };

  enterNotificationRoom = () => {
    if (this.UserStore.userId) {
      this.socket.emit(
        socketEvents.joinNotificationLobby,
        this.UserStore.userId
      );
    }
  };

  getChats = async () =>
    new Promise((resolve, reject) => {
      this.socket.emit(socketEvents.getChats, this.UserStore.userId, (data) => {
        if (data.error) {
          reject(data.error);
        }
        resolve(data);
      });
    });

  getChatMessages = async (chatId) =>
    new Promise((resolve, reject) => {
      this.socket.emit(socketEvents.getChatMessages, chatId, (data) => {
        if (data.error) {
          reject(data.error);
        }
        resolve(data);
      });
    });

  // enterRoom = ({ id }) => {
  //   return new Promise((resolve, reject) => {
  //     console.log('enterRoom', { id });
  //     this.io.emit('enterRoom', { id });

  //     this.io.once('room', (roomData) => {
  //       console.log('enterRoom -> room', roomData);
  //       this.state.setActiveRoomId(id);
  //       this.state.updateActiveRoom(roomData);
  //       resolve(this.state.activeRoom);

  //       this.io.on('room', (roomData) => {
  //         console.log('room', roomData);
  //         this.state.updateActiveRoom(roomData);
  //       });
  //     });
  //   });
  // };

  // leaveRoom = () => {
  //   return new Promise((resolve, reject) => {
  //     console.log('leaveRoom');
  //     this.io.emit('leaveRoom');
  //     this.io.off('room');
  //     this.state.setActiveRoomId(null);
  //     resolve();
  //   });
  // };

  // messageToRoom = ({ content }) => {
  //   return new Promise((resolve, reject) => {
  //     console.log('message', { id: this.state.activeRoomId, content });
  //     this.io.emit('message', { id: this.state.activeRoomId, content });
  //     resolve();
  //   });
  // };
}

export default SocketStore;
