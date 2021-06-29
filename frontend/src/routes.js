import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Wrapper from './main/routWrapper';
import { Provider } from 'mobx-react';
import RouterStore from './stores/Router';
import 'react-notifications-component/dist/theme.css';
import ReactNotification, { store } from 'react-notifications-component';

const PrivateRoute = ({ component: Component, redirect, name, ...rest }) => (
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
                return <Component name {...props} />;
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
            duration: 3000,
            onScreen: true,
        },
        showIcon: true,
    };

    // eslint-disable-next-line default-case
    switch (type) {
        case 'info':
            store.addNotification({
                title: title,
                message: message,
                type: 'info',
                ...opt,
            });
            break;
        case 'success':
            store.addNotification({
                title: title,
                message: message,
                type: 'success',
                ...opt,
            });
            break;

        case 'warning':
            store.addNotification({
                title: title,
                message: message,
                type: 'warning',
                ...opt,
            });
            break;
        case 'error':
            store.addNotification({
                title: title,
                message: message,
                type: 'danger',
                ...opt,
            });
    }
};

// eslint-disable-next-line react/display-name
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <Provider RouterStore={RouterStore}>
            <BrowserRouter>
                <ReactNotification />
                <Switch>
                    <Route
                        exact={true}
                        path="/"
                        render={(props) => <Wrapper {...props} name={'home'} />}
                    />
                    <Route
                        exact={true}
                        path="/search"
                        render={(props) => (
                            <Wrapper {...props} name={'search'} />
                        )}
                    />
                    <Route
                        exact={true}
                        path="/case/:id"
                        render={(props) => <Wrapper {...props} name={'case'} />}
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
                    <Route
                        exact={true}
                        path="/profile/:id"
                        render={(props) => (
                            <Wrapper {...props} name={'profile'} />
                        )}
                    />
                    <PrivateRoute
                        exact
                        path="/lk"
                        name="lk"
                        redirect="/login"
                        component={Wrapper}
                        // render={(props) => <Wrapper {...props} name={'lk'} />}
                    />
                    <PrivateRoute
                        exact
                        path="/chat/:id"
                        name="chat"
                        redirect="/login"
                        component={Wrapper}
                        // render={(props) => <Wrapper {...props} name={'chat'} />}
                    />
                    <PrivateRoute
                        exact
                        path="/create"
                        name="create"
                        redirect="/login"
                        component={Wrapper}
                        // render={(props) => (
                        //     <Wrapper {...props} name={'create'} />
                        // )}
                    />
                    <Route render={() => <div>{'not found'}</div>} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};
