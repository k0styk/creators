import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";
import getAddress from '../../api/dadata';

class CreateStore {
    youtubeId = '';
    title = '';
    spheres = [];
    types = [];
    addresses = []

    constructor({RouterStore}) {
        makeObservable(this, {
            youtubeId: observable,
            title: observable,
            spheres: observable,
            types: observable,
            addresses: observable,
            setYoutubeId: action,
            setTitle: action,
            getData: action,
            changeAddress: action
        })
        this.routerStore = RouterStore || {};
        this.getData();
    }

    changeAddress = (value) => {
        return getAddress(value);
    }

    getData = async () => {
        try {
            const {data: spheres} = await API.get('promos/getSpheres');
            const {data: types} = await API.get('promos/getTypes');
            this.spheres = spheres.map(({id, name}) => {
                return {value: id, label: name}
            });
            this.types = types.map(({id, name}) => {
                return {value: id, label: name}
            })
    }
    catch (e) {
        console.log(e);
    }
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
}

export default CreateStore;
