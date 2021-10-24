import { observable, action, get, computed, makeObservable, toJS } from 'mobx';
import { status, chatEnum, socketEvents } from '../../enums';

class ChatStore {
  RouterStore = {};

  @observable services = [];
  @observable checkedServices = [];
  @observable price = '';
  @observable case = {};
  @observable userCases = [];
  @observable status;
  @observable loadDialogsStatus;
  @observable loadMessagesStatus;

  @observable text = '';
  @observable dialogs = [];
  @observable messages = [];
  @observable selectedDialog = null;

  constructor({ RouterStore, SocketStore }) {
    makeObservable(this);
    this.RouterStore = RouterStore || {};
    this.SocketStore = SocketStore || {};

    if (this.SocketStore) {
      this.notifySocket = this.SocketStore.notifySocket;
      this.chatSocket = this.SocketStore.chatSocket;
    }

    this.chatSocket.on('connect', () => {
      console.log('Chat connected: ', this.chatSocket.id);
    });

    this.selectedDialog = this.chatId;
    if (!this.chatSocket.connected) {
      this.chatSocket.connect();
    }
    this.getChats();
    if (this.isDialogSelected) {
      this.getChatMessages();
      this.enterChatRoom(this.chatId);
    }
  }

  @computed get chatId() {
    return get(get(this.RouterStore.match, 'params'), 'id');
  }

  @computed get isDialogSelected() {
    return Boolean(this.selectedDialog);
  }

  close = () => {
    this.disposerAutorunPromo();
  };

  @action setText = ({ target: { value } }) => {
    this.text = value;
  };

  @action selectDialog = (dialogId) => {
    this.leaveChatRoom(this.chatId);
    if (dialogId) {
      this.selectedDialog = dialogId;
      this.RouterStore.history.push({ pathname: `/chat/${dialogId}` });
      this.enterChatRoom(dialogId);
      this.setMessages([]);
      this.getChatMessages();
    } else {
      this.selectedDialog = null;
      this.RouterStore.history.push({ pathname: `/chat` });
      this.setMessages([]);
    }
  };

  @action setDialogsStatus = (staus) => {
    this.loadDialogsStatus = staus;
  };

  @action setMessagesStatus = (staus) => {
    this.loadMessagesStatus = staus;
  };

  @action setDialogs = (dialogs) => {
    this.dialogs = [...dialogs];
  };

  @action setMessages = (messages) => {
    this.messages = [...messages];
  };

  @action addMessage = (message) => {
    this.messages.push(message);
  };

  @action changeMessage = (messageId, key, value) => {
    const array = this.messages.map((m) => {
      if (m.messageId === messageId) {
        return {
          ...m,
          [key]: value,
        };
      }
      return m;
    });
    this.setMessages(array);
  };

  // ID = () => '_' + Math.random().toString(36).substr(2, 9);

  getChats = () => {
    this.setDialogsStatus(chatEnum.IS_CHECKING);
    // this.SocketStore.getChats().then((data) => {
    //   this.setDialogsStatus(chatEnum.IS_RECIEVED);
    //   this.setDialogs(data);
    // });
    this.chatSocket.emit(
      socketEvents.getChats,
      this.SocketStore.UserStore.userId,
      (data) => {
        if (data.error) {
          console.error(data.error);
        }
        this.setDialogsStatus(chatEnum.IS_RECIEVED);
        this.setDialogs(data);
      }
    );
  };

  getChatMessages = () => {
    this.setMessagesStatus(chatEnum.IS_CHECKING);
    this.chatSocket.emit(
      socketEvents.getChatMessages,
      this.selectedDialog,
      (data) => {
        if (data.error) {
          console.error(data.error);
        }
        this.setMessagesStatus(chatEnum.IS_RECIEVED);
        if (data) {
          console.log(data.messages);
          this.setMessages(data.messages);
        }
      }
    );
  };

  sendMessage = (text) => {
    const messageId = this.messages.length + 1;
    const sendData = {
      chatId: this.chatId,
      fromId: this.SocketStore.UserStore.userId,
      dateSend: new Date(),
      isReaded: false,
      messageId,
      text,
    };
    const message = {
      ...sendData,
      status: status.LOADING,
    };
    this.addMessage(message);

    this.chatSocket.emit(socketEvents.sendMessage, sendData, ({ status }) => {
      this.changeMessage(messageId, 'status', status);
    });
  };

  enterChatRoom = (id) => {
    if (id) {
      this.chatSocket.emit(socketEvents.joinChat, id);
    }
  };

  leaveChatRoom = (id) => {
    if (id) {
      this.chatSocket.emit(socketEvents.leftChat, id);
    }
  };
}

export default ChatStore;
