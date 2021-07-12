import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";

class HomeStore {
    @observable recommendations = [];

    constructor() {
        makeObservable(this)
    }

    getRecommendations = async () => {
        try {
            const cases = await API.get('cases/getRecommendations');
            this.setRecommendations(cases)
        } catch (e) {
            console.log(e);
        }
    }
}

export default HomeStore;
