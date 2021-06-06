import {observable, get, action, toJS, computed, makeObservable} from 'mobx';

class CaseStore {
    routerStore = {};

    constructor({RouterStore}) {
        makeObservable(this, {
            items: observable,
        })
    }

}

export default CaseStore;
