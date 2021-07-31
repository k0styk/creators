import {observable, get, computed, makeObservable} from 'mobx';


class PromoStore {
    RouterStore = {};

    @observable services = [];
    @observable checkedServices = [];
    @observable price = '';
    @observable case = {};
    @observable userCases = [];
    @observable status;

    constructor({RouterStore}) {
        makeObservable(this,)
        this.RouterStore = RouterStore || {};
    }

    @computed get caseId() {
        return Number(get(get(this.RouterStore.match, 'params'), 'id'));
    }

    close = () => {
        this.disposerAutorunPromo();
    }
}

export default PromoStore;
