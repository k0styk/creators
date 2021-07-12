import './login.scss';
import React from 'react';
import {inject, Provider} from "mobx-react";
import AuthStore from "../../stores/User/AuthStore";
import LoginView from './LoginView';


@inject(({RouterStore, UserStore}) => {
    return {RouterStore, UserStore};
})
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore, UserStore} = props;

        this.AuthStore = new AuthStore({RouterStore, UserStore});
    }

    render() {
        return (
            <Provider AuthStore={this.AuthStore}>
                <LoginView/>
            </Provider>
        );
    }
}

export default LoginPage;
