import { io } from 'socket.io-client';
import { autorun, observable } from 'mobx';

import { socketEvents } from '../../enums';

class Socket {
  @observable isConnected;

  constructor({ RouterStore, UserStore }) {
    this.socket = io(process.env['REACT_APP_API_HOST'], {
      withCredentials: true,
      transports: ['websocket'],
    });
    // this.ChatStore = ChatStore || {};
    this.RouterStore = RouterStore || {};
    this.UserStore = UserStore || {};

    this.initSocketEvents();

    autorun(() => this.enterLobby());
  }

  initSocketEvents = () => {
    this.socket.on('connect', () => {
      console.log('Socket connected: ', this.socket.id);
    });

    this.socket.on(socketEvents.joinChat, () => {
      console.log('ROOM EVENT');
    });
  };

  enterLobby = () => {
    console.log('enterLobby');
    console.log(this.UserStore.userId);
    if (this.UserStore.userId) {
      this.socket.emit(
        socketEvents.joinNotificationLobby,
        this.UserStore.userId
      );
    }

    // this.io.on('rooms', (roomsData) => {
    //   console.log('rooms', roomsData);
    //   this.state.setRooms(roomsData);
    //   resolve(this.state.rooms);
    // });
  };

  // leaveLobby = () => {
  //   return new Promise((resolve, reject) => {
  //     console.log('leaveLobby');
  //     this.io.emit('leaveLobby');
  //     this.io.off('rooms');
  //     resolve();
  //   });
  // };

  // createRoom = ({ title }) => {
  //   return new Promise((resolve, reject) => {
  //     console.log('createRoom', { title });
  //     this.io.emit('createRoom', { title });

  //     this.io.once('room', (roomData) => {
  //       console.log('createRoom -> room', roomData);
  //       this.state.createRoom(roomData);
  //       resolve(this.state.activeRoom);

  //       this.io.on('room', (roomData) => {
  //         console.log('room', roomData);
  //         this.state.updateActiveRoom(roomData);
  //       });
  //     });
  //   });
  // };

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

export default Socket;
