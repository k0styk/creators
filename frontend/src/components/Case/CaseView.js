import React from 'react';
import { inject } from 'mobx-react';
import s from './Case.module.scss';
import { Link, Divider } from '@material-ui/core';
import MediaBlock from './MediaBlock';
import Cases from '../../shared/CaseCard';
import Breadcrumbs from '../../shared/NavBar';
import { status as statusEnum } from '../../enums';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import City from '../../shared/renderFields/rederCity';
import Loader from '../../shared/Loader';
import Error from '../../shared/Error';
import dayjs from 'dayjs';

dayjs.locale('ru');

@inject(({ CaseStore }) => {
  return {
    price: CaseStore.price,
    case: CaseStore.case || {},
    userCases: CaseStore.userCases || [],
    type: (CaseStore.case || {}).type,
    sphere: (CaseStore.case || {}).sphere,
    status: CaseStore.status,
    goToSearch: CaseStore.goToSearch,
    setFavorite: CaseStore.setFavorite,
  };
})
class Search extends React.Component {
  render() {
    const {
      case: caseCard,
      userCases,
      type,
      sphere,
      status,
      goToSearch,
      setFavorite,
    } = this.props;

    console.log(this.props);

    const breadcrumbs = [
      { title: 'Видео' },
      { title: type },
      { title: sphere },
    ];
    if (status === statusEnum.ERROR) {
      return <Error />;
    }
    if (status === statusEnum.LOADING) {
      return <Loader />;
    }
    if (status === statusEnum.SUCCESS) {
      return (
        <div className={s.body}>
          <div className={s.title}>
            {caseCard.title}
            <City city={caseCard.city} />
            <div className={s.dateCreated}>
              {caseCard.createdAt &&
                dayjs(caseCard.createdAt).format('MMM D, YYYY hh:mm')}
            </div>
          </div>
          <MediaBlock />
          <Breadcrumbs className={s.breadcrumbs} items={breadcrumbs} />
          <div className={s.desc}>
            <Divider />
            <span className={s.descTitle}>Описание</span>
            <span className={s.descText}>{caseCard.desc || 'Не указано'}</span>
            <Divider />
          </div>
          <div className={s.more}>
            Еще работы автора
            <Link color={'primary'} className={s.buttonLink}>
              <span className={s.moreWorks} onClick={goToSearch}>
                все работы
                <NavigateNextIcon className={s.navNext} />
              </span>
            </Link>
          </div>
          <Cases setFavorite={setFavorite} cases={userCases} />
        </div>
      );
    }
  }
}

export default Search;
