import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";
import getAddress from '../../api/dadata';
import {Alert} from '../../routes';

class CreateStore {
    spheres = [];
    types = [];
    addresses = []

    youtubeId = '';
    title = '';
    selectedTypes = null;
    selectedSpheres = null;
    prices = {};
    city = null;

    services = [];
    checkedMainServices = [];
    checkedAddServices = [];

    desc = null;

    constructor({RouterStore}) {
        makeObservable(this, {
            youtubeId: observable,
            setYoutubeId: action,
            title: observable,
            setTitle: action,
            spheres: observable,
            onChangeSpheres: action,
            types: observable,
            selectedTypes: observable,
            selectedSpheres: observable,
            onChangeTypes: action,
            addresses: observable,
            services: observable,

            getData: action,
            changeAddress: action,

            addServices: computed,
            onCheckAddService: action,
            onCheckMainService: action,
            checkedAddServices: observable,
            checkedMainServices: observable,
            prices: observable,
            onPriceChange: action,

            desc: observable,
            onChangeDesc: action,

            city: observable,
            onChangeCity: action
        })
        this.routerStore = RouterStore || {};
        this.getData();
    }

    changeAddress = (value) => {
        return getAddress(value);
    }

    getData = async () => {
        try {
            const {data: {types, services, spheres}} = await API.get('promos/getDataForCreate');
            this.spheres = spheres.map(({id, name}) => {
                return {value: id, label: name}
            });
            this.types = types.map(({id, name}) => {
                return {value: id, label: name}
            });
            this.services = services;
        } catch (e) {
            console.log(e);
        }
    }

    get addServices() {
        console.log(this.services, this.checkedMainServices);
        return this.services.filter(({id}) => !this.checkedMainServices.includes(id));
    }

    onCheckAddService = (id) => {
        if (this.checkedAddServices.includes(id)) {
            this.checkedAddServices = this.checkedAddServices.filter((item) => item !== id)
        } else this.checkedAddServices = [...this.checkedAddServices, id];
    }

    onCheckMainService = (id) => {
        if (this.checkedMainServices.includes(id)) {
            this.checkedMainServices = this.checkedMainServices.filter((item) => item !== id)
        } else this.checkedMainServices = [...this.checkedMainServices, id];
    }

    setTitle = ({target: {value}}) => {
        this.title = value
    }

    setYoutubeId = ({target: {value}}) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = value.match(regExp);
        this.youtubeId = (match && match[7].length == 11) ? match[7] : false;
        console.log((match && match[7].length == 11) ? match[7] : false);
    }

    onPriceChange = (price, serviceId) => {
        console.log(price, serviceId);

        this.prices[serviceId] = price;
    }

    onChangeDesc = ({target: {value}}) => {
        this.desc = value;
    }

    onChangeCity = (city) => {
        console.log(city);
        this.city = city;
    }

    onChangeSpheres = (spheres) => {
        this.selectedSpheres = spheres
    }

    onChangeTypes = (types) => {
        this.selectedTypes = types;
    }

    checkFields = () => {
        if (!this.title || !this.youtubeId || !this.selectedSpheres || !this.selectedTypes) {
            Alert({type: 'error', title: 'Заполните обязательные поля'})
            return false
        }

        if (!this.checkedMainServices.length) {
            Alert({type: 'error', title: 'Укажите, что включено'})
            return false
        }

        console.log(this.checkedMainServices.length + this.checkedAddServices.length, Object.keys(this.prices).length)
        if (this.checkedMainServices.length + this.checkedAddServices.length !== Object.keys(this.prices).length) {
            Alert({type: 'error', title: 'Укажите стоимость услуг'})
            return false
        }

        return true;
    }

    sumbit = async () => {
        if (!this.checkFields()) {
            return;
        }

        const {
            city,
            desc,
            youtubeId,
            selectedSpheres: sphere,
            selectedTypes: type,
            title,
            checkedMainServices: mainServices,
            checkedAddServices: addServices,
            prices
        } = this;

        const res = {
            city,
            desc,
            youtubeId,
            typeId: type.value,
            sphereId: type.value,
            title,
            mainServices: mainServices.map((item) => {
                return {
                    id: item,
                    price: prices[item]
                }
            }),
            addServices: addServices.map((item) => {
                return {
                    id: item,
                    price: prices[item]
                }
            })
        }


        try {
            await API.post('promos/create', res);
            Alert({
                type: 'success',
                title: 'Успешно!',
                message: 'Ваше объявление будет опубликовано и проверено модерацией в течении 24 часов'
            })

        } catch (_) {
            Alert({
                type: 'error',
                title: 'Ошибка при создании объявления'
            })
        }
    }


}

export default CreateStore;
