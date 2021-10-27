import { observable, action, get, computed, makeObservable } from 'mobx';

import { status, chatEnum, socketEvents } from '../../enums';
import formatPrice from '../../tools/formatPrice';
import getProductionTime from '../../tools/getProductionTime';

class ChatStore {
  RouterStore = {};

  @observable services = [];
  @observable checkedServices = [];
  @observable price = '';
  @observable productionTime = 0;
  @observable status;
  @observable loadDialogsStatus;
  @observable loadMessagesStatus;

  @observable text = '';
  @observable dialogs = [];
  @observable messages = [];
  @observable selectedDialog = null;
  timerId = undefined;

  constructor({ RouterStore, SocketStore }) {
    makeObservable(this);
    this.RouterStore = RouterStore || {};
    this.SocketStore = SocketStore || {};

    if (this.SocketStore) {
      this.notifySocket = this.SocketStore.notifySocket;
      this.chatSocket = this.SocketStore.chatSocket;
    }

    this.selectedDialog = this.chatId;
    if (!this.chatSocket.connected) {
      this.chatSocket.connect();
    }
    this.initSocketEvents();
    this.getChats();
    if (this.isDialogSelected) {
      this.getChatMessages();
      this.enterChatRoom(this.chatId);
    }
  }

  debounceFunction = (func, delay) => {
    clearTimeout(this.timerId);

    // Executes the func after delay time.
    this.timerId = setTimeout(func, delay);
  };

  initSocketEvents = () => {
    this.chatSocket.on('connect', () => {
      console.log('Chat connected: ', this.chatSocket.id);
    });

    this.chatSocket.on(socketEvents.message, (message) => {
      if (this.messages.slice(-1)[0].messageId) {
        if (this.messages.slice(-1)[0].messageId > message.messageId) {
          // TODO: make sorting messages
          // const compare = (a, b) => {
          //   if (a.last_nom < b.last_nom) {
          //     return -1;
          //   }
          //   if (a.last_nom > b.last_nom) {
          //     return 1;
          //   }
          //   return 0;
          // };
          this.addMessage(message);
          return;
        }
      }
      this.addMessage(message);
    });

    this.chatSocket.on(socketEvents.updateServices, (checkedServices) => {
      this.initServices(this.services, checkedServices);
    });
  };

  @computed get chatId() {
    return get(get(this.RouterStore.match, 'params'), 'id');
  }

  @computed get isDialogSelected() {
    return Boolean(this.selectedDialog);
  }

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

  @action setServices = (services) => {
    this.services = [...services];
  };

  @action setCheckedServices = (services) => {
    this.checkedServices = [...services];
  };

  @action setProductionTime = (time) => {
    this.productionTime = time;
  };

  @action initServices = (services, checkedServices) => {
    this.setServices(services);
    this.setCheckedServices(checkedServices);
    this.changePrice();
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

  @action onCheckService = (id) => {
    if (this.checkedServices.includes(id)) {
      this.checkedServices = this.checkedServices.filter((item) => item !== id);
    } else this.checkedServices = [...this.checkedServices, id];

    this.changePrice();
    this.debounceFunction(this.exchangeServices, 3000);
  };

  @action changePrice = () => {
    const price = this.services.reduce((prev, cur) => {
      if (this.checkedServices.includes(cur.serviceId)) {
        return prev + cur.price;
      }
      return prev;
    }, 0);

    this.price = formatPrice(price);
  };

  dispose = () => {
    this.chatSocket.disconnect();
  };

  getChats = () => {
    this.setDialogsStatus(chatEnum.IS_CHECKING);
    this.chatSocket.emit(
      socketEvents.getChats,
      this.SocketStore.UserStore.userId,
      this.SocketStore.UserStore.user.type,
      (data) => {
        if (data?.error) {
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
        if (data?.error) {
          console.error(data.error);
        }
        this.setMessagesStatus(chatEnum.IS_RECIEVED);
        if (data) {
          const { messages, services, checkedServices, productionTime } = data;
          this.setMessages(messages);
          this.initServices(services, checkedServices);
          this.setProductionTime(getProductionTime(productionTime));
        }
      }
    );
  };

  sendMessage = (text) => {
    if (!text.trim().length) return;
    const messageId = +new Date();
    const sendData = {
      chatId: this.chatId,
      fromId: this.SocketStore.UserStore.userId,
      userType: this.SocketStore.UserStore.user.type,
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

  exchangeServices = () => {
    this.chatSocket.emit(
      socketEvents.exchangeServices,
      this.chatId,
      this.checkedServices
    );
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
