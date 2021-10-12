import { observable, action, get, computed, makeObservable } from 'mobx';

class ChatStore {
  RouterStore = {};

  @observable services = [];
  @observable checkedServices = [];
  @observable price = '';
  @observable case = {};
  @observable userCases = [];
  @observable status;

  @observable dialogs = [];
  @observable messages = [];
  @observable selectedDialog = null;

  constructor({ RouterStore }) {
    makeObservable(this);
    this.RouterStore = RouterStore || {};

    this.selectedDialog = this.chatId;
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
    } else {
      this.selectedDialog = null;
      this.RouterStore.history.push({ pathname: `/chat` });
    }
  };
}

export default ChatStore;
