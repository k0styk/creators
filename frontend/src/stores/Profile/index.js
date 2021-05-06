import {observable, get, action, toJS, computed, makeObservable} from 'mobx';

class ProfileService {
    routerStore = {};
    items = [
        {title: 'Съемка', price: 2000, id: 1, tooltip: 1},
        {title: 'Монтаж', price: 6000, id: 2, tooltip: 1},
        {title: 'Сценарий', price: 6500, id: 3, tooltip: 1},
        {title: 'Озвучка', price: 7000, id: 4, tooltip: 1},

    ]
    checked = [];
    price = '';

    constructor({RouterStore}) {
        makeObservable(this, {
            promoId: computed,
            checked: observable,
            onCheckService: action,
            price: observable,
            changePrice: action,
        })
        this.checked = [1,3];
        this.changePrice();
        this.routerStore = RouterStore || {};
    }

    get promoId() {
        console.log(toJS(this.routerStore));

        return Number(get(get(this.routerStore.match, 'params'), 'id')) || null;
    }

    onCheckService = (id) => {
        if (this.checked.includes(id)) {
            this.checked = this.checked.filter((item) => item !== id)
        } else this.checked = [...this.checked, id];

        this.changePrice();
    }

    changePrice = () => {
        let sumPrice = 0;
        this.items.forEach(({id, price}) => {
            if (this.checked.includes(id)) {
                sumPrice += price;
            }
        })
        this.price = sumPrice;
    }

}

export default ProfileService;
