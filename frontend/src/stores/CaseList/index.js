import {observable, makeObservable} from 'mobx';

class CaseStore {
    routerStore = {};

    constructor({RouterStore}) {
        makeObservable(this, {
            items: observable,
        })
    }

}

export default CaseStore;
