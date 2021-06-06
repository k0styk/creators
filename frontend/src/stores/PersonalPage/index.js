import {observable, get, action, toJS, computed, makeObservable} from 'mobx';
import API from "../../api";

class PersonalPageStore {
    routerStore = {};
    user = {};
    spheres = [];
    cases = [];
    casesCount = 0;
    isEdit = false;

    constructor({RouterStore}) {
        console.log(PersonalPageStore);
        makeObservable(this, {
            user: observable,
            cases: observable,
            casesCount: observable,
            spheres: observable,
            setUser: action,
            initData: action,
            isEdit: observable,
            toggleEdit: action,
            setUserField: action
        })
        this.routerStore = RouterStore || {};
        this.getData();
    }

    getData = async () => {
        try {
            const {
                user,
                cases,
                casesCount,
                spheres
            } = await API.get('users/getPersonalPage');

            this.setUser(user);
            this.initData({spheres, cases, casesCount});
        } catch (e) {
            console.log(e);
        }
    }

    setUser = (user) => {
        this.user = user;
    }

    initData = ({spheres, cases, casesCount}) => {
        this.spheres = spheres;
        this.cases = cases;
        this.casesCount = casesCount;
    }

    toggleEdit = () => {
        this.isEdit = !this.isEdit;
    }

    setUserField = (field, value) => {
        this.user[field] = value;
    }

    loadFiled = async (files) => {
        const data = new FormData();
        data.append('file', files[0]);

        try {
            const {data: {file}} = await API.post('upload', data);

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
            firstName
        } = this.user;

        try {
            await API.post('users/editUser', {
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
