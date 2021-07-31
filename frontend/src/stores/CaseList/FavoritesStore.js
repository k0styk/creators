import {action, makeObservable} from 'mobx';
import API from "../../api";
import FilterStore from '../FilterStore';
import {status as statusEnum} from '../../enums';

class HomeStore extends FilterStore {

    constructor({RouterStore}) {
        super({RouterStore});

        makeObservable(this)
        this.getFavorites();
    }

    getFavorites = async () => {
        try {
            this.setStatus(statusEnum.LOADING);
            const cases = await API.get('favorites/getFavorites');

            this.setFavorites(cases);
            this.setStatus(statusEnum.SUCCESS);
        } catch (e) {
            console.log(e);
            this.setStatus(statusEnum.ERROR);
        }
    }

    @action setFavorites = (cases) => {
        this.cases = cases;
    }
}

export default HomeStore;
