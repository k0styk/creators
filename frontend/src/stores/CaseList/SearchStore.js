import {observable, action, when, makeObservable} from 'mobx';
import API from "../../api";
import FilterStore from '../FilterStore';
import {status as statusEnum} from '../../enums';

class SearchStore extends FilterStore {
    RouterStore

    @observable cases = [];
    @observable user = {};
    @observable inited = false;
    @observable status = statusEnum.LOADING;

    constructor({RouterStore}) {
        super({RouterStore})
        this.RouterStore = RouterStore;

        makeObservable(this);
        this.initParams();
        when(
            () => !!this.inited,
            this.searchCases
        );

        this.userId && this.getUser();
    }

    @action initParams = () => {
        console.log('initParams');

        this.setType(Number(this.RouterStore.getParam('type')));
        this.setSphere(Number(this.RouterStore.getParam('sphere')));
        this.setPrice('to', this.RouterStore.getParam('priceto'));
        this.setPrice('from', this.RouterStore.getParam('pricefrom'));
        this.setTime(Number(this.RouterStore.getParam('time')));
        this.setFastFilter(this.RouterStore.getParam('fastFilter'));
        this.setUserId(this.RouterStore.getParam('user'));
        this.inited = true;
    }

    @action setUser = (user) => {
        this.user = user;
    }

    @action setCases = (cases) => {
        this.cases = cases;
    }

    @action setStatus = (status) => {
        this.status = status;
    }

    @action clear = () => {
        this.selectedSphere = null;
        this.selectedType = null;
        this.time = null;
        this.price = {};
        this.fastFilter = '';
        this.search();
    }

    getUser = async () => {
        try {
            this.setStatus(statusEnum.LOADING);
            const user = await API.get(`users/getUser/${this.userId}`)

            this.setUser(user);
            this.setStatus(statusEnum.SUCCESS);
        } catch (e) {
            this.setStatus(statusEnum.ERROR);
        }
    }

    search = () => {
        this.setParameters();
        this.searchCases();
    }

    getBody = () => {
        const {
            selectedType,
            selectedSphere,
            time = {},
            price = {},
            fastFilter,
            userId
        } = this;

        const body = {};

        if (fastFilter) {
            body.fastFilter = fastFilter
        }

        console.log('suuka', selectedType)

        if (selectedType && typeof selectedType === 'object') {
            body.type = selectedType.value;
        } else {
            body.type = selectedType;
        }

        if (selectedSphere && typeof selectedSphere === 'object') {
            body.sphere = selectedSphere.value;
        } else {
            body.sphere = selectedSphere;
        }

        if (time) {
            body.time = {
                to: time.to,
                from: time.from
            }
        }

        if (price) {
            body.price = {
                to: price.to,
                from: price.from
            }
        }

        if (userId) {
            body.userId = userId
        }

        return body;
    }

    searchCases = async () => {
        try {
            this.setStatus(statusEnum.LOADING);

            const cases = await API.post('cases/searchCases', this.getBody());

            this.setCases(cases);
            this.initParams();
            this.setStatus(statusEnum.SUCCESS);
        } catch (e) {
            console.log(e);
            this.setStatus(statusEnum.ERROR);
        }
    }
}

export default SearchStore;
