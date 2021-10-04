import { observable, get, action, computed, makeObservable } from 'mobx';
import API from '../../api';

class ProfileService {
  routerStore = {};

  @observable user = {};
  @observable cases = [];

  constructor({ RouterStore }) {
    makeObservable(this);
    this.routerStore = RouterStore || {};
    this.getData();
  }

  @computed get userId() {
    return get(get(this.routerStore.match, 'params'), 'id') || null;
  }

  @action setUser = (user) => {
    this.user = user;
  };

  @action setCases = (cases) => {
    this.cases = cases;
  };

  getData = async () => {
    try {
      const { cases, ...user } = await API.get(
        `users/getProfile/${this.userId}`
      );
      this.setUser(user);
      this.setCases(cases);
    } catch (e) {
      console.log(e);
    }
  };
}

export default ProfileService;
