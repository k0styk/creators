import {observable, action, makeObservable} from 'mobx';
import API from "../../api";
import {authStatusEnum} from '../../enums';

class UserStore {
    @observable userId;
    @observable user;
    @observable authStatus;

    constructor() {
        makeObservable(this)
        this.getCurrentUser();
    }


    @action setAuthStatus = (staus) => {
        this.authStatus = staus;
    }

    @action setEmail = ({target: {value}}) => {
        this.email = value;
    }

    @action setUserId = (userId) => {
        this.userId = userId;
    }

    @action setUser = (user) => {
        this.user = user;
        this.userId = user.id
    }

    getCurrentUser = async () => {
        this.setAuthStatus(authStatusEnum.IS_CHECKING)
        try {
            const user = await API.get(`users/getCurrentUser`)

            if (user) {
                this.setUser(user);
                this.setAuthStatus(authStatusEnum.IS_AUTHENTICATED)
            } else {
                this.setAuthStatus(authStatusEnum.AUTH_IS_FAILED)
            }

        } catch (err) {
            this.setAuthStatus(authStatusEnum.AUTH_IS_FAILED)
            console.error(err);
        }
    }
}

export default UserStore;
