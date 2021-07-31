import {observable, makeObservable, action, toJS, computed} from 'mobx';
import API from "../api";
import {status as statusEnum} from '../enums';

class FilterStore {
    RouterStore;

    @observable spheres = []
    @observable types = []
    @observable cases = [];
    @observable userId;
    @observable selectedSphere = null;
    @observable selectedCity = null;
    @observable selectedType = null;
    @observable time = {};
    @observable price = {};
    @observable fastFilter;
    @observable status = statusEnum.LOADING;

    times = [
        {label: 'до 15 сеĸ', value: 1, to: '15'},
        {label: '15-30 сеĸ', value: 2, from: '15', to: '30'},
        {label: '30-60 сеĸ', value: 3, from: '30', to: '60'},
        {label: '1-3 мин', value: 4, from: '60', to: '180'},
        {label: '3-10 мин', value: 5, from: '180', to: '600'},
        {label: 'более 10 мин', value: 6, from: '600'}
    ];

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

    @action setTimeObject = (timeto, timefrom) => {
        this.time = this.times.find(({to, from}) =>
            Number(timeto) && Number(timefrom) && Number(to) === Number(timeto) && Number(from) === Number(timefrom)
            || Number(timeto) === Number(to) || Number(timefrom) === Number(from));
    }

    @action setStatus = (status) => {
        this.status = status;
    }

    @action setFavorite = async (caseId, action) => {
        try {
            await API.post('favorites/setFavorite', {caseId, action});
            this.cases = this.cases.map((item) => {
                if (item.id === caseId) {
                    return {
                        ...item, inFavorite: action
                    }
                }
                return item;
            })

        } catch (e) {
            console.log(e);
        }
    }

    @action setPrice = (field, val) => {
        this.price[field] = val;
    }

    @action setTime = (val) => {
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
