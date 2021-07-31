import {observable, get, action, reaction, computed, makeObservable} from 'mobx';
import API from "../../api";
import {serviceType} from '../../enums';
import getProductionTime from '../../tools/getProductionTime';
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
        this.disposerAutorunPromo = reaction(
            () => this.caseId,
            this.getData,
            {fireImmediately: true}
        );
    }

    @computed get caseId() {
        return Number(get(get(this.RouterStore.match, 'params'), 'id'));
    }

    getData = async () => {
        if (!this.caseId) {
            return
        }
        this.setStatus(statusEnum.LOADING);
        try {
            const result = await API.get(`cases/getCase/${this.caseId}`)
            const {
                services,
                userCases,
                ...caseObject
            } = result;

            this.setPromo(caseObject);
            this.setUserPromos(userCases);
            this.initServices(services || []);
            this.setStatus(statusEnum.SUCCESS);
        } catch (e) {
            this.setStatus(statusEnum.ERROR);
            Alert({type: 'error', title: 'Ошибка при получении кейса'})
            console.log(e);
        }
    }

    @action setFavorite = async (caseId, action) => {
        try {
            await API.post('favorites/setFavorite', {caseId, action});
            this.userCases = this.userCases.map((item) => {
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

    @action setUserPromos = (userPromos) => {
        this.userCases = userPromos;
    }

    @action setStatus = (status) => {
        this.status = status;
    }

    @action setPromo = (caseObject) => {
        const productionTime = getProductionTime(caseObject.productionTime);
        this.case = {...caseObject, productionTime};
    }

    @action initServices = (services) => {
        this.checkedServices = services.filter(({type}) => type === serviceType.MAIN).map(({id}) => id);
        this.services = services;
        this.changePrice();
    }

    @action setServices = (services) => {
        this.services = services;
    }

    @action onCheckService = (id) => {
        if (this.checkedServices.includes(id)) {
            this.checkedServices = this.checkedServices.filter((item) => item !== id)
        } else this.checkedServices = [...this.checkedServices, id];

        this.changePrice();
    }

    @action changePrice = () => {
        let sumPrice = 0;
        this.services.forEach(({id, price}) => {
            if (this.checkedServices.includes(id)) {
                sumPrice += Number(price);
            }
        })
        this.price = formatPrice(sumPrice);
    }

    goToSearch = () => {
        const urlParams = new URLSearchParams()
        urlParams.append('user', this.case.user.id);
        this.close();
        this.RouterStore.history.push({
            pathname: '/search',
            search: urlParams.toString()
        });
    }

    close = () => {
        this.disposerAutorunPromo();
    }
}

export default PromoStore;
