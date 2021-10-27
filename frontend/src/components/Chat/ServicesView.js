import React from 'react';
import s from './Chat.module.scss';
import { inject } from 'mobx-react';
import { Avatar, Button, Link } from '@material-ui/core';

import CheckboxList from './CheckboxList';

@inject(({ ChatStore, UserStore }) => {
  return {
    price: ChatStore.price,
    user: UserStore.user,
    productionTime: ChatStore.productionTime,
  };
})
class ServicesView extends React.Component {
  render() {
    const { user, price, productionTime } = this.props;

    return (
      <>
        <div className={s.info}>
          <div className={s.header}>
            <div>
              <span className={s.titleS}>Стоимость: {price} руб.</span>
              <span className={s.descTitle}>
                Срок изготовления: {productionTime}
              </span>
            </div>
            <Link className={s.user} href={`/profile/${user.id}`}>
              {user.firstName}
              <Avatar alt={user.firstName} src={user.photoPath} />
            </Link>
          </div>
          <div></div>
          <div className={s.servicesBlock}>
            <div className={s.titleBox}>
              <span>Что включено</span>
            </div>
            <div className={s.list}>
              <CheckboxList />
            </div>
            <div className={s.buttons}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={s.buttonLink}
                onClick={this.goToChat}
                disabled
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ServicesView;
