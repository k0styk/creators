import {observable, get, action, toJS, computed, makeObservable} from 'mobx';

class ProfileService {
    routerStore = {};

    constructor({RouterStore}) {
        makeObservable(this);
        this.routerStore = RouterStore || {};
    }

   @computed get userId() {
        return Number(get(get(this.routerStore.match, 'params'), 'id')) || null;
    }

}

export default ProfileService;
