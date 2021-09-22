import { observable, action, get, computed, makeObservable } from 'mobx';

class PromoStore {
    RouterStore = {};

    @observable services = [];
    @observable checkedServices = [];
    @observable price = '';
    @observable case = {};
    @observable userCases = [];
    @observable status;

    @observable dialogs = [];
    @observable messages = [];
    @observable selectedDialog = -1;

    constructor({ RouterStore }) {
        makeObservable(this);
        this.RouterStore = RouterStore || {};
    }

    @computed get caseId() {
        return Number(get(get(this.RouterStore.match, 'params'), 'id'));
    }

    close = () => {
        this.disposerAutorunPromo();
    };

    @action selectDialog = (dialogIndex) => {
        this.selectedDialog = dialogIndex;
    };

    @computed get isDialogSelected() {
        return Boolean(~this.selectedDialog);
    }
}

export default PromoStore;
