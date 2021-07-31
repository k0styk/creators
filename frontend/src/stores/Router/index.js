import {observable, get, action, makeObservable, computed} from 'mobx';

class RouterStore {
    UserStore

    @observable location = {};
    @observable match = [];
    @observable history = [];

    privateRoutes = ['lk', 'favorites', 'create', 'chat']
    authRoutes = ['login', 'register']

    @observable isPermitted;

    constructor({UserStore}) {
        this.UserStore = UserStore;
        makeObservable(this)
    }

    @computed get urlIsEmpty() {
        return !get(this.location, 'search');
    }


    @action setRoute(location, match, history) {
        this.location = location;
        this.match = match;
        this.history = history;
    }

    getParam = (param) => {
        const search = get(this.location, 'search');
        const urlAddress = new URLSearchParams(search);

        return urlAddress.get(param);
    }
}

export default RouterStore;
