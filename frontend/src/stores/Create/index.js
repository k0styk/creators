import { observable, action, makeObservable } from 'mobx';
import API from '../../api';
import { Alert } from '../../routes';

class CreateStore {
  @observable spheres = [];
  @observable types = [];

  @observable youtubeId = '';
  @observable title = '';
  @observable selectedTypes = null;
  @observable selectedSpheres = null;
  @observable prices = {};
  @observable city = null;

  @observable services = [];
  @observable checkedMainServices = [];
  @observable checkedAddServices = [];

  @observable desc = null;

  @observable time = {};

  constructor({ RouterStore }) {
    makeObservable(this);
    this.RouterStore = RouterStore || {};
    this.getData();
  }

  @action setTime = (field, val) => {
    this.time[field] = val;
  };

  getData = async () => {
    try {
      const { types, services, spheres } = await API.get(
        'cases/getDataForCreate'
      );
      this.spheres = spheres.map(({ id, name }) => {
        return { value: id, label: name };
      });
      this.types = types.map(({ id, name }) => {
        return { value: id, label: name };
      });
      this.services = services;
    } catch (e) {
      console.log(e);
    }
  };

  get addServices() {
    return this.services.filter(
      ({ id }) => !this.checkedMainServices.includes(id)
    );
  }

  get productionTime() {
    const { hours, minutes, days } = this.time;
    let minutesAll = Number(minutes || 0);
    if (hours) {
      minutesAll += hours * 60;
    }
    if (days) {
      minutesAll += days * 24 * 60;
    }

    return minutesAll;
  }

  @action onCheckAddService = (id) => {
    if (this.checkedAddServices.includes(id)) {
      this.checkedAddServices = this.checkedAddServices.filter(
        (item) => item !== id
      );
    } else this.checkedAddServices = [...this.checkedAddServices, id];

    if (this.checkedMainServices.includes(id)) {
      this.checkedMainServices = this.checkedMainServices.filter(
        (item) => item !== id
      );
    }
  };

  @action onCheckMainService = (id) => {
    if (this.checkedMainServices.includes(id)) {
      this.checkedMainServices = this.checkedMainServices.filter(
        (item) => item !== id
      );
    } else this.checkedMainServices = [...this.checkedMainServices, id];

    if (this.checkedAddServices.includes(id)) {
      this.checkedAddServices = this.checkedAddServices.filter(
        (item) => item !== id
      );
    }
  };

  @action setTitle = ({ target: { value } }) => {
    this.title = value;
  };

  @action setYoutubeId = ({ target: { value } }) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = value.match(regExp);
    this.youtubeId = match && match[7].length === 11 ? match[7] : false;
  };

  @action onPriceChange = (price, serviceId) => {
    this.prices[serviceId] = price;
  };

  @action onChangeDesc = ({ target: { value } }) => {
    this.desc = value;
  };

  @action onChangeCity = (city) => {
    this.city = city;
  };

  @action onChangeSpheres = (spheres) => {
    this.selectedSpheres = spheres;
  };

  @action onChangeTypes = (types) => {
    this.selectedTypes = types;
  };

  @action checkFields = () => {
    if (
      !this.productionTime ||
      !this.title ||
      !this.youtubeId ||
      !this.selectedSpheres ||
      !this.selectedTypes
    ) {
      Alert({ type: 'error', title: 'Заполните обязательные поля' });
      return false;
    }

    if (!this.checkedMainServices.length) {
      Alert({ type: 'error', title: 'Укажите, что включено' });
      return false;
    }
    if (
      this.checkedMainServices.length + this.checkedAddServices.length !==
      Object.keys(this.prices).length
    ) {
      Alert({ type: 'error', title: 'Укажите стоимость услуг' });
      return false;
    }

    return true;
  };

  @action sumbit = async () => {
    if (!this.checkFields()) {
      return;
    }

    const {
      city,
      desc,
      youtubeId,
      selectedSpheres: sphere,
      selectedTypes: type,
      title,
      checkedMainServices: mainServices,
      checkedAddServices: addServices,
      prices,
      productionTime,
    } = this;

    const res = {
      city,
      desc,
      youtubeId,
      typeId: type.value,
      sphereId: sphere.value,
      title,
      productionTime,
      mainServices: mainServices.map((item) => {
        return {
          id: item,
          price: prices[item].replace(/\D+/g, ''),
        };
      }),
      addServices: addServices.map((item) => {
        return {
          id: item,
          price: prices[item].replace(/\D+/g, ''),
        };
      }),
    };

    try {
      const result = await API.post('cases/create', res);
      if (result.isCreated) {
        Alert({
          type: 'success',
          title: 'Успешно!',
          message:
            'Ваше объявление будет опубликовано и проверено модерацией в течении 24 часов',
        });
        this.RouterStore.history.push('/lk');
      } else {
        console.log(result.error);
        Alert({
          type: 'error',
          title: result.message,
        });
      }
    } catch (e) {
      console.log(e);
      Alert({
        type: 'error',
        title: 'Ошибка при создании объявления',
      });
    }
  };
}

export default CreateStore;
