import React from 'react';
import { inject } from 'mobx-react';
import s from '../PersonalPage.module.scss';
import { Button, Divider, Link } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
import Cards from '../../../shared/CaseCard';
import NoCasesView from '../noCases';

@inject(({ PersonalPageStore, RouterStore }) => {
  return {
    cases: PersonalPageStore.cases,
    user: PersonalPageStore.user,
    RouterStore,
  };
})
class CasesBlock extends React.Component {
  createCase = () => {
    this.props.RouterStore.history.push({
      pathname: '/create',
    });
  };

  render() {
    const { cases, user } = this.props;

    return (
      <div className={s.works}>
        <span className={s.titleWorks}>
          {' '}
          Ваши кейсы
          <Button
            size="small"
            color="primary"
            onClick={this.createCase}
            disabled={!(user.isFullRegister && user.isActivated)}
          >
            {' '}
            Добавить кейс
          </Button>
        </span>
        <Divider />
        {cases.length ? (
          <Cards
            cases={cases}
            withActions={false}
            user={user}
            withIncludes={false}
          />
        ) : (
          <NoCasesView text={'У вас еще нет кейсов :('} />
        )}
        <span className={s.titleWorks}>Выполненные заказы</span>
        <Divider />
        {(!cases.length && (
          <Cards
            user={user}
            cases={cases}
            withActions={false}
            withIncludes={false}
          />
        )) || <NoCasesView text={'У вас нет выполненных заказов :('} />}
      </div>
    );
  }
}

export default CasesBlock;
