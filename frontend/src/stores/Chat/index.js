import { observable, action, get, computed, makeObservable } from 'mobx';
import { chatEnum } from '../../enums';

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

  @observable dialogs = [];
  @observable messages = [];
  @observable selectedDialog = null;

  constructor({ RouterStore, SocketStore }) {
    makeObservable(this);
    this.RouterStore = RouterStore || {};
    this.SocketStore = SocketStore || {};

    this.selectedDialog = this.chatId;
    if (this.isDialogSelected) {
      this.getChats();
      this.getChatMessages();
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

  @action selectDialog = (dialogIndex) => {
    if (dialogIndex) {
      this.selectedDialog = dialogIndex;
      this.RouterStore.history.push({ pathname: `/chat/${dialogIndex}` });
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

  getChats = () => {
    this.setDialogsStatus(chatEnum.IS_CHECKING);
    this.SocketStore.getChats().then((data) => {
      this.setDialogsStatus(chatEnum.IS_RECIEVED);
      this.setDialogs(data);
    });
  };

  getChatMessages = () => {
    this.setMessagesStatus(chatEnum.IS_CHECKING);
    this.SocketStore.getChatMessages(this.chatId).then((data) => {
      this.setMessagesStatus(chatEnum.IS_RECIEVED);
      console.log(data);
      this.setMessages([]);
    });
  };
}

export default ChatStore;
