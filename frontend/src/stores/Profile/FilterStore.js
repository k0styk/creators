import {action, computed, get, makeObservable} from 'mobx';
import FilterBaseStore from '../FilterStore';
import ProfileService from "./index";

class FilterStore extends FilterBaseStore {
    RouterStore

    constructor({RouterStore}) {
        super({RouterStore})
        this.RouterStore = RouterStore;

        makeObservable(this);
    }

    @computed userId = ()=>{
       return   Number(get(get(this.RouterStore.match, 'params'), 'id')) || null;
    }

    search = () => {
        this.setUserId(this.userId);
        this.setParameters();
    }
}

export default FilterStore;