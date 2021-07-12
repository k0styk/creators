import {configure} from 'mobx';
import User from '../stores/User';
import Router from '../stores/Router';

configure({
    enforceActions: 'observed'
});

export default function configureStore() {
    const UserStore = new User();
    const RouterStore = new Router({UserStore});


    return {
        stores: {
            RouterStore,
            UserStore
        }
    };
}
