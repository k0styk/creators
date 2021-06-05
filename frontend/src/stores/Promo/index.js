import {observable, get, action, reaction, computed, makeObservable, autorun} from 'mobx';
import API from "../../api";
import {serviceType} from '../../enums';
import formatTime from '../../tools/formatProductionTime';
import formatPrice from '../../tools/formatPrice';

class PromoStore {
    routerStore = {};

    @observable services = [];
    @observable checkedServices = [];
    @observable price = '';
    @observable promo = {};
    @observable userPromos = [];

    constructor({RouterStore}) {
        makeObservable(this,)
        this.routerStore = RouterStore || {};

       this.disposerAutorunPromo = autorun(this.getData);
    }

    @computed get promoId() {
        return Number(get(get(this.routerStore.match, 'params'), 'id')) || null;
    }

    getData = async () => {
        try {
            const {
                services,
                userPromos,
                ...promo
                } = await API.get(`promos/getPromo/${this.promoId}`).then(({data}) => data);

            this.setPromo(promo);
            this.setUserPromos(userPromos);
            this.initServices(services || []);
        } catch (e) {
            console.log(e);
        }
    }

   @action setUserPromos = (userPromos) => {
        this.userPromos = userPromos;
   }

   @action setPromo = (promo) => {
        const productionTime = formatTime(promo.productionTime);
        this.promo = {...promo, productionTime};
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


    @action close = () => {
       this.disposerAutorunPromo();
    }
}

export default PromoStore;
