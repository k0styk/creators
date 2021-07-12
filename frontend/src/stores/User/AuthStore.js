import {observable, action, makeObservable} from 'mobx';
import AuthService from '../../api/auth/auth.service';


class AuthStore {
    UserStore;
    RouterStore;

    @observable email;
    @observable showPassword = 'password';
    @observable password;

    constructor({UserStore, RouterStore}) {
        this.UserStore = UserStore;
        this.RouterStore = RouterStore;

        makeObservable(this)
    }

    @action setEmail = ({target: {value}}) => {
        this.email = value;
    }

    @action toggleShowPassword = () => {
        this.showPassword === 'password' ?
            this.showPassword = 'text' :
            this.showPassword = 'password';
    }

    @action setPassword = ({target: {value}}) => {
        this.password = value;
    }

    loginUser = () => {
        const {email, password} = this;

        try {
            AuthService.login({email, password})
                .then((data) => {
                    const userId = data.id;

                    this.UserStore.setUserId(userId);
                    this.RouterStore.history.push({pathname: '/',});
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    };
}

export default AuthStore;
