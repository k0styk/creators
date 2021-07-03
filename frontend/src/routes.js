import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Wrapper from './main/routWrapper';
import { Provider } from 'mobx-react';
import RouterStore from './stores/Router';
import 'react-notifications-component/dist/theme.css';
import ReactNotification, { store } from 'react-notifications-component';

const PrivateRoute = ({redirect, name, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            const redi = () => (
                <Redirect
                    to={{
                        pathname: redirect,
                        state: {
                            from: props.location,
                        },
                    }}
                />
            );
            // maybe add check from backend or get from cookies, or use store
            const user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                return <Wrapper name {...props} />;
            } else {
                return redi();
            }
        }}
    />
);

export const Alert = ({ type, title = ' ', message = ' ' }) => {
    const opt = {
        container: 'top-right',
        dismiss: {
            duration: 2000,
            onScreen: false
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
            break;
        case 'success':
            store.addNotification({
                title: title,
                message: message,
                type: "success",
                ...opt
            });
            break;

        case 'warning':
            store.addNotification({
                title: title,
                message: message,
                type: "warning",
                ...opt
            });
            break;
        case 'error':
            store.addNotification({
                title: title,
                message: message,
                type: "danger",
                ...opt
            });
    }
};

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default () => {
    return (
        <Provider RouterStore={RouterStore}>
            <BrowserRouter>
                <ReactNotification />
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
                        path='/case/:id'
                        render={(props) => <Wrapper {...props} name={'case'}/>}
                    />
                    <Route
                        exact={true}
                        path='/profile/:id'
                        render={(props) => <Wrapper {...props} name={'profile'}/>}
                    />
                    <Route
                        exact={true}
                        path="/login"
                        render={(props) => (
                            <Wrapper {...props} name={'login'} />
                        )}
                    />
                    <Route
                        exact={true}
                        path="/register"
                        render={(props) => (
                            <Wrapper {...props} name={'register'} />
                        )}
                    />
                    <PrivateRoute
                        exact
                        path="/lk"
                        name="lk"
                        redirect="/login"
                    />
                    <PrivateRoute
                        exact
                        path="/chat/:id"
                        name="chat"
                        redirect="/login"
                    />
                    <PrivateRoute
                        exact
                        path="/create"
                        name="create"
                        redirect="/login"
                    />
                    <Route render={() => <div>{'not found'}</div>} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};
