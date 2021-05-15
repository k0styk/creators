import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Wrapper from './main/routWrapper';
import {Provider} from "mobx-react";
import RouterStore from './stores/Router';
import 'react-notifications-component/dist/theme.css'
import ReactNotification, { store } from 'react-notifications-component';

export const Alert = ({type, title = ' ', message = ' '}) => {
    const opt = {
        container: "top-right",
        dismiss: {
            duration: 3000,
            onScreen: true
        },
        showIcon: true
    };

    switch (type) {
        case 'info':
            store.addNotification({
                title: title,
                message: message,
                type: "info",
                ...opt
            });

        case 'success':
            store.addNotification({
                title: title,
                message: message,
                type: "success",
                ...opt
            });

        case 'warning':
            store.addNotification({
                title: title,
                message: message,
                type: "warning",
                ...opt
            });

        case 'error':
            store.addNotification({
                title: title,
                message: message,
                type: "danger",
                ...opt
            });
    }
}

// eslint-disable-next-line react/display-name
export default () => {
    return (
        <Provider RouterStore={RouterStore}>
            <BrowserRouter>
                <ReactNotification/>
                <Switch>
                    <Route
                        exact={true}
                        path='/'
                        render={(props) => <Wrapper {...props} name={'home'}/>}
                    />
                    <Route
                        exact={true}
                        path='/search'
                        render={(props) => <Wrapper {...props} name={'search'}/>}
                    />
                    <Route
                        exact={true}
                        path='/promo/:id'
                        render={(props) => <Wrapper {...props} name={'promo'}/>}
                    />
                    <Route
                        exact={true}
                        path='/profile/:id'
                        render={(props) => <Wrapper {...props} name={'profile'}/>}
                    />
                    <Route
                        exact={true}
                        path='/lk'
                        render={(props) => <Wrapper {...props} name={'lk'}/>}
                    />
                    <Route
                        exact={true}
                        path='/chat/:id'
                        render={(props) => <Wrapper {...props} name={'chat'}/>}
                    />
                    <Route
                        exact={true}
                        path='/create'
                        render={(props) => <Wrapper {...props} name={'create'}/>}
                    />
                    <Route render={() => <div>{'Miss'}</div>}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

