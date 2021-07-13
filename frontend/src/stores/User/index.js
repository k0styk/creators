import {observable, action, makeObservable} from 'mobx';
import API from "../../api";
import {authStatusEnum} from '../../enums';
import AuthService from "../../api/auth/auth.service";

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
                this.setAuthStatus(authStatusEnum.IS_NOT_AUTHENTICATED)
            }

        } catch (err) {
            this.setAuthStatus(authStatusEnum.IS_NOT_AUTHENTICATED)
            console.error(err);
        }
    }

    @action logout = async() =>{
        this.userId = null;
        this.user = null;
        this.authStatus = authStatusEnum.IS_NOT_AUTHENTICATED;
        await AuthService.logout()

    }
}

export default UserStore;
