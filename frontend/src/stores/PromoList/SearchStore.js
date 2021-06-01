import {observable, get, action, reaction, when, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";
import FilterStore from './FilterStore';
import {status as statusEnum} from '../../enums';

class SearchStore extends FilterStore {
    RouterStore

    @observable promos = [];
    @observable inited = false;
    @observable status = statusEnum.LOADING;

    constructor({RouterStore}) {
        super({RouterStore})
        this.RouterStore = RouterStore;

        makeObservable(this);
        this.initParams();
        when(
            () => !!this.inited,
            () => this.searchPromos()
        );
    }

    @action initParams = () => {
        this.setType(Number(this.RouterStore.getParam('type')));
        this.setSphere(Number(this.RouterStore.getParam('sphere')));
        this.setPrice('to', this.RouterStore.getParam('priceto'));
        this.setPrice('from', this.RouterStore.getParam('pricefrom'));
        this.setTime(Number(this.RouterStore.getParam('time')));
        this.inited = true;
    }

    @action setPromos = (promos) =>{
        this.promos = promos;
    }

    @action setStatus = (status) =>{
        this.status = status;
    }

     search = () => {
        this.setParameters();
        this.searchPromos();
    }

    searchPromos = async() => {
        try {
            this.setStatus(statusEnum.LOADING);
            const {selectedType, selectedSphere, time = {}, price = {}} = this;
            const body = {
                type: toJS(selectedType || {}).value || selectedType,
                sphere: toJS(selectedSphere || {}).value || selectedSphere,
                time: {
                    to: time.to,
                    from: time.from
                },
                price: {
                    to: price.to,
                    from: price.from
                }
            }
            const promos = await API.post('promos/searchPromos', body).then(({data}) => data);

            this.setPromos(promos);
            this.setStatus(statusEnum.SUCCESS);
        }
        catch (e) {
            this.setStatus(statusEnum.ERROR);
        }
    }
}

export default SearchStore;
