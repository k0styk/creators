import {observable, get, action, makeObservable, computed} from 'mobx';

class RouterStore {
    location = {};
    match = {};
    history = {};

    constructor() {
        makeObservable(this, {
            location: observable,
            match: observable,
            history: observable,
            setRoute: action,
            getParam: action
        })
    }

    @computed get urlIsEmpty() {
        return !get(this.location, 'search');
    }

    setRoute(location, match, history){
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

export default new RouterStore();
