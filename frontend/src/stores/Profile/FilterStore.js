import { computed, get, makeObservable } from 'mobx';
import FilterBaseStore from '../FilterStore';

class FilterStore extends FilterBaseStore {
  RouterStore;

  constructor({ RouterStore }) {
    super({ RouterStore });
    this.RouterStore = RouterStore;

    makeObservable(this);
  }

  @computed get user() {
    return get(get(this.RouterStore.match, 'params'), 'id') || null;
  }

  search = () => {
    this.setUserId(this.user);
    this.setParameters();
  };
}

export default FilterStore;
