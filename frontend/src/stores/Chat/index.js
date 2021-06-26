import {observable, get, action, reaction, computed, makeObservable} from 'mobx';
import API from "../../api";
import {serviceType} from '../../enums';
import formatTime from '../../tools/formatProductionTime';
import formatPrice from '../../tools/formatPrice';
import {status as statusEnum} from '../../enums';
import {Alert} from '../../routes';

class PromoStore {
    RouterStore = {};

    @observable services = [];
    @observable checkedServices = [];
    @observable price = '';
    @observable case = {};
    @observable userCases = [];
    @observable status;

    constructor({RouterStore}) {
        makeObservable(this,)
        this.RouterStore = RouterStore || {};
    }

    @computed get caseId() {
        return Number(get(get(this.RouterStore.match, 'params'), 'id'));
    }

    close = () => {
        this.disposerAutorunPromo();
    }
}

export default PromoStore;
