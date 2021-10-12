import { configure } from 'mobx';
import User from '../stores/User';
import Router from '../stores/Router';
import Socket from '../stores/Socket';

configure({
  enforceActions: 'observed',
});

export default function configureStore() {
  const UserStore = new User();
  const RouterStore = new Router({ UserStore });
  const SocketStore = new Socket({ UserStore, RouterStore });

  return {
    stores: {
      RouterStore,
      UserStore,
      SocketStore,
    },
  };
}
