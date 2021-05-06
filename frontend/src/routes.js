import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Wrapper from './main/routWrapper';
import {Provider} from "mobx-react";
import RouterStore from './stores/Router';

// eslint-disable-next-line react/display-name
export default () => {
    return (
        <Provider RouterStore={RouterStore}>
            <BrowserRouter>
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
                    <Route render={() => <div>{'Miss'}</div>}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

