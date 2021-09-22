import { observable, action, makeObservable } from 'mobx';
import AuthService from '../../api/auth/auth.service';
import { Alert } from '../../routes';
import { authStatusEnum, userType } from '../../enums';

class AuthStore {
    UserStore;
    RouterStore;

    @observable email = '';
    @observable showPassword = 'password';
    @observable password = '';
    @observable isCreator;
    @observable repeatPassword = '';

    constructor({ UserStore, RouterStore }) {
        this.UserStore = UserStore;
        this.RouterStore = RouterStore;

        makeObservable(this);
    }

    @action setIsCreator = () => {
        this.isCreator = !this.isCreator;
    };

    @action setRepeatPassword = ({ target: { value } }) => {
        this.repeatPassword = value;
    };

    @action setEmail = ({ target: { value } }) => {
        this.email = value;
    };

    @action toggleShowPassword = () => {
        this.showPassword === 'password'
            ? (this.showPassword = 'text')
            : (this.showPassword = 'password');
    };

    @action setPassword = ({ target: { value } }) => {
        this.password = value;
    };

    checkPassword = () => this.password === this.repeatPassword;

    check = () => {
        if (!this.email || !this.password || !this.repeatPassword) {
            Alert({ type: 'error', title: 'Заполните обязательные поля' });
            return false;
        }

        if (!this.checkPassword()) {
            Alert({ type: 'error', title: 'Пароли не совпадают' });
            return false;
        }

        return true;
    };

    loginUser = async () => {
        const { email, password } = this;

        try {
            const data = await AuthService.login({ email, password });
            localStorage.setItem('token', data['accessToken']);
            await this.UserStore.getCurrentUser();

            this.RouterStore.history.push({ pathname: '/lk' });
        } catch (err) {
            Alert({ type: 'error', title: 'Ошибка входа' });
            this.UserStore.setAuthStatus(authStatusEnum.IS_NOT_AUTHENTICATED);
            console.error(err);
        }
    };

    registerUser = async () => {
        const { email, password, isCreator } = this;

        if (!this.check()) {
            return;
        }

        try {
            const roleTypeId =
                (isCreator && userType.CREATOR) || userType.CONSUMER;

            const data = await AuthService.register({
                email,
                password,
                roleTypeId,
            });
            localStorage.setItem('token', data['accessToken']);
            await this.UserStore.getCurrentUser();

            this.RouterStore.history.push({ pathname: '/lk' });
        } catch (err) {
            Alert({ type: 'error', title: 'При регистрации возникла ошибка' });
            this.UserStore.setAuthStatus(authStatusEnum.IS_NOT_AUTHENTICATED);
            console.error(err);
        }
    };
}

export default AuthStore;
