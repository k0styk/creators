import {observable, get, action, toJS, computed, makeObservable} from 'mobx';

class PromoStore {
    routerStore = {};

    constructor({RouterStore}) {
        makeObservable(this, {
            items: observable,
        })
    }

}

export default PromoStore;
