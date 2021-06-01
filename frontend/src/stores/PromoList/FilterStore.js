import {observable, get, makeObservable, action, toJS, computed} from 'mobx';
import API from "../../api";

class FilterStore {
    RouterStore;
    spheres = []
    types = []

    @observable selectedSphere = null;
    @observable selectedCity = null;
    @observable selectedType = null;
    @observable time = {};
    @observable price = {};

    constructor({RouterStore}) {
        this.RouterStore = RouterStore;
        makeObservable(this);
        this.getParameters();
    }

    @computed get filterIsEmpty() {
        return !this.selectedSphere && !this.selectedType &&
            !this.time && !Object.values(toJS(this.price)).filter(Boolean).length
    }

    @action clear = () => {
        this.selectedSphere = null;
        this.selectedType = null;
        this.time = {};
        this.price = {};
    }

    clearParams = ()=> {
        this.RouterStore.history.push({
            pathname: '/search',
            search: ''
        });
    };

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

    initParameters = (types, spheres) => {
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
        const {selectedType, selectedSphere, time = {}, price = {}} = this;
        const params = {
            type: toJS(selectedType || {}).value,
            sphere: toJS(selectedSphere || {}).value,
            timeto: time.to,
            timefrom: time.from,
            priceto: price.to,
            pricefrom: price.from
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
            const promos = await API.get('promos/getRecommendations').then(({data}) => data)
            this.setRecommendations(promos)
        } catch (e) {
            console.log(e);
        }
    }

    getParameters = async () => {
        try {
            const {types, spheres} = await API.get('promos/getParameters').then(({data}) => data)

            this.initParameters(types, spheres)
        } catch (e) {
        }
    }
}

export default FilterStore;
