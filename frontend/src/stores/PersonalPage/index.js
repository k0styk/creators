import {observable, action, makeObservable} from 'mobx';
import API from "../../api";

class PersonalPageStore {
    @observable routerStore = {};
    @observable user = {};
    @observable spheres = [];
    @observable cases = [];
    @observable casesCount = 0;
    @observable isEdit = false;
    @observable activeCases = [];
    @observable completedCases = [];
    sumPrice = 0;

    constructor({RouterStore}) {
        makeObservable(this)
        this.routerStore = RouterStore || {};
        this.getData();
    }

    getData = async () => {
        try {
            const {
                user,
                cases,
                casesCount,
                spheres,
                activeCases,
                completedCases,
                sumPrice
            } = await API.get('users/getPersonalPage');

            this.setUser(user);
            this.initData({
                spheres,
                cases,
                casesCount,
                activeCases,
                completedCases,
                sumPrice
            });
        } catch (e) {
            console.log(e);
        }
    }

    @action setUser = (user) => {
        this.user = user;
    }

    @action initData = ({spheres, cases, casesCount, sumPrice}) => {
        this.spheres = spheres;
        this.cases = cases;
        this.casesCount = casesCount;
        this.sumPrice = sumPrice;
    }

    @action toggleEdit = () => {
        this.isEdit = !this.isEdit;
    }

    @action  setUserField = (field, value) => {
        this.user[field] = value;
    }

    loadFiled = async (files) => {
        const data = new FormData();
        data.append('file', files[0]);

        try {
            const {file} = await API.post('upload', data);

            this.setUserField('photoPath', file)
        } catch (e) {
            console.log(e);
        }
    }

    updateUser = async () => {
        const {
            about,
            photoPath,
            lastName,
            secondName,
            firstName,
            city
        } = this.user;

        try {
            await API.post('users/editUser', {
                about,
                photoPath,
                lastName,
                secondName,
                firstName,
                city
            });

            this.toggleEdit();
        } catch (e) {
            console.log(e);
        }

    }

}

export default PersonalPageStore;
