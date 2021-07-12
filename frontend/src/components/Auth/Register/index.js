import React from 'react';
import {inject, Provider} from "mobx-react";
import AuthStore from "../../../stores/User/AuthStore";
import RegisterView from './RegisterView';

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
                <RegisterView/>
            </Provider>
        );
    }
}

export default LoginPage;
