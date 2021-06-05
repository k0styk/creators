import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";
import FilterStore from './FilterStore';

class HomeStore extends FilterStore {
    @observable recommendations = [];

    constructor({RouterStore}) {
        super({RouterStore});

        makeObservable(this)
        this.getRecommendations();
    }

    getRecommendations = async () => {
        try {
            const promos = await API.get('promos/getRecommendations').then(({data}) => data)
            this.setRecommendations(promos)
        } catch (e) {
            console.log(e);
        }
    }

    @action setRecommendations = (promos) => {
        this.recommendations = promos;
    }

    search = () => this.setParameters();
}

export default HomeStore;
