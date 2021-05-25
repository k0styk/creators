import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";

class PersonalPageStore {
    routerStore = {};
    user = {};
    spheres = [];
    promos = [];
    promosCount = 0;
    isEdit = false;

    constructor({RouterStore}) {
        makeObservable(this, {
            user: observable,
            promos: observable,
            promosCount: observable,
            spheres: observable,
            setUser: action,
            initData: action,
            isEdit: observable,
            toggleEdit: action,
            setUserField: action
        })
        this.routerStore = RouterStore || {};
        this.getData();
        console.log('34');
    }

    getData = async () => {
        try {
            const {
                data: {
                    user,
                    promos,
                    promosCount,
                    spheres
                }
            } = await API.get('users/getPersonalPage');

            this.setUser(user);
            this.initData({spheres, promos, promosCount});
        } catch (e) {
            console.log(e);
        }
    }

    setUser = (user) => {
        this.user = user;
    }

    initData = ({spheres, promos, promosCount}) => {
        this.spheres = spheres;
        this.promos = promos;
        this.promosCount = promosCount;
    }

    toggleEdit = () => {
        this.isEdit = !this.isEdit;
    }

    setUserField = (field, value) => {
        this.user[field] = value;
    }

    loadFiled = async(files) => {
        const data = new FormData();
        console.log(files);
        data.append('file', files[0]);

        try {
            const {data: {file}} = await API.post('upload', data);

            this.setUserField('photoPath', file)
        } catch (e) {
            console.log(e);
        }

    }

    updateUser = async() => {
        const {
            about,
            photoPath,
            lastName,
            secondName,
            firstName
        } = this.user;

        try {
            const {data} = await API.post('users/editUser', {
                about,
                photoPath,
                lastName,
                secondName,
                firstName
            });

            this.toggleEdit();
        } catch (e) {
            console.log(e);
        }

    }

}

export default PersonalPageStore;
