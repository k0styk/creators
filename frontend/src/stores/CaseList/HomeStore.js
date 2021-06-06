import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";
import FilterStore from '../FilterStore';

class HomeStore extends FilterStore {
    @observable recommendations = [];

    constructor({RouterStore}) {
        super({RouterStore});

        makeObservable(this)
        this.getRecommendations();
    }

    getRecommendations = async () => {
        try {
            const cases = await API.get('cases/getRecommendations');
            this.setRecommendations(cases)
        } catch (e) {
            console.log(e);
        }
    }

    @action setRecommendations = (cases) => {
        this.recommendations = cases;
    }

    search = () => this.setParameters();
}

export default HomeStore;
