import {observable, makeObservable, action, toJS, computed} from 'mobx';
import API from "../api";

class FilterStore {
    RouterStore;

    @observable spheres = []
    @observable types = []

    @observable userId;
    @observable selectedSphere = null;
    @observable selectedCity = null;
    @observable selectedType = null;
    @observable time = {};
    @observable price = {};
    @observable fastFilter;

    constructor({RouterStore}) {
        this.RouterStore = RouterStore;
        makeObservable(this);

        this.getParameters();
    }

    @computed get filterIsEmpty() {
        return !this.selectedSphere && !this.selectedType &&
            !this.time && !Object.values(toJS(this.price)).filter(Boolean).length && !this.fastFilter
    }

    @computed get urlIsEmpty() {
        return this.RouterStore.urlIsEmpty
    }

    @action setPrice = (field, val) => {
        this.price[field] = val;
    }

    @action  setTime = (val) => {
        this.time = val;
    }

    @action setSphere = (val) => {
        this.selectedSphere = val;
    }

    @action setType = (val) => {
        this.selectedType = val;
    }

    @action setFastFilter = (fastFilter) => {
        this.fastFilter = fastFilter;
    }

    @action setUserId = (userId) => {
        this.userId = userId;
    }

    @action initParameters = (types, spheres) => {

        this.spheres = spheres.map(({id, name}) => {
            return {
                label: name,
                value: id
            }
        });
        this.types = types.map(({id, name}) => {
            return {
                label: name,
                value: id
            }
        });
    }

    setParameters = async () => {
        const {
            selectedType,
            selectedSphere,
            time = {},
            price = {},
            fastFilter,
            userId
        } = this;

        const params = {
            type: toJS(selectedType || {}).value || selectedType,
            sphere: toJS(selectedSphere || {}).value || selectedSphere,
            timeto: time && time.to,
            timefrom: time && time.from,
            priceto: price && price.to,
            pricefrom: price && price.from,
            fastFilter,
            user: userId
        }
        const urlParams = new URLSearchParams()
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                urlParams.append(key, value);
            }
        }
        this.RouterStore.history.push({
            pathname: '/search',
            search: urlParams.toString()
        });
    }

    getRecommendations = async () => {
        try {
            const cases = await API.get('cases/getRecommendations');
            this.setRecommendations(cases)
        } catch (e) {
            console.log(e);
        }
    }

    getParameters = async () => {
        try {
            const {types, spheres} = await API.get('cases/getParameters')
            this.initParameters(types, spheres)
        } catch (e) {
        }
    }
}

export default FilterStore;
