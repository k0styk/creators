import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Wrapper from './main/routWrapper';
import { Provider } from 'mobx-react';
import 'react-notifications-component/dist/theme.css';
import ReactNotification, { store } from 'react-notifications-component';
import initStores from './main/initStores';
import NotFound from './shared/NotFound';

export const Alert = ({
  type,
  title = ' ',
  message = ' ',
  duration = 2000,
}) => {
  const opt = {
    container: 'top-right',
    dismiss: {
      duration,
      onScreen: false,
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

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default () => {
  const { stores } = initStores();

  return (
    <Provider {...stores}>
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
            render={(props) => <Wrapper {...props} name={'search'} />}
          />
          <Route
            exact={true}
            path="/case/:id"
            render={(props) => <Wrapper {...props} name={'case'} />}
          />
          <Route
            exact={true}
            path="/profile/:id"
            render={(props) => <Wrapper {...props} name={'profile'} />}
          />
          <Route
            exact={true}
            path="/login"
            render={(props) => <Wrapper {...props} name={'login'} />}
          />
          <Route
            exact={true}
            path="/register"
            render={(props) => <Wrapper {...props} name={'register'} />}
          />
          <Route
            exact
            path="/lk"
            name="lk"
            render={(props) => <Wrapper {...props} name={'lk'} />}
          />
          <Route
            exact
            path="/chat"
            name="chat"
            render={(props) => <Wrapper {...props} name={'chat'} />}
          />
          <Route
            exact
            path="/chat/:id"
            name="chat"
            render={(props) => <Wrapper {...props} name={'chat'} />}
          />
          <Route
            exact
            path="/create"
            render={(props) => <Wrapper {...props} name={'create'} />}
          />
          <Route
            exact
            path="/favorites"
            render={(props) => <Wrapper {...props} name={'favorites'} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
