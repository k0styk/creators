import React from 'react';
import { inject } from 'mobx-react';
import s from './Profile.module.scss';
import { Chip, Button } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Filter from './Filter';
import Cards from '../../shared/CaseCard';
import FormatPrice from '../../tools/formatPrice';
import City from '../../shared/renderFields/rederCity';

@inject(({ ProfileStore }) => {
  return {
    user: ProfileStore.user || {},
    cases: ProfileStore.cases,
    casesCount: (ProfileStore.user || {})['casesCount'],
    spheres: (ProfileStore.user || {})['spheres'] || [],
    sumPrice: (ProfileStore.user || {})['sumPrice'],
  };
})
class ProfileView extends React.Component {
  render() {
    const { user, cases, casesCount, spheres, sumPrice } = this.props;
    return (
      <React.Fragment>
        <div className={s.body}>
          <div className={s.leftSide}>
            <div className={s.avatar}>
              <img alt={user.firstName} src={user.photoPath} />
            </div>
          </div>
          <div className={s.user}>
            <span className={s.userName}>
              {user.firstName} {user.secondName} {user.lastName}
            </span>
            <City city={user.city} />
            <div className={s.infoBlock}>
              <div>
                <span className={s.titleField}>Деятельность</span>
                <span>
                  <Chip className={s.chip} label="видео" size="small" />
                </span>
              </div>
              <div>
                <span className={s.titleField}>Сферы клиентов</span>
                <span>
                  {spheres.map((item) => (
                    <Chip
                      key={item}
                      className={s.chip}
                      size="small"
                      label={item}
                    />
                  ))}
                </span>
              </div>
              <div>
                <span className={s.titleField}>Количество кейсов</span>
                <span className={s.valueField}>
                  <Chip className={s.chip} size="small" label={casesCount} />
                </span>
              </div>
              <div>
                <span className={s.titleField}>Средняя стоимость работ</span>
                <span>
                  <Chip
                    className={s.chip}
                    size="small"
                    label={FormatPrice(sumPrice)}
                  />
                </span>
              </div>
              <div>
                <span className={s.titleField}> О себе </span>
                <span>{user.desc || 'Не указано'}</span>
              </div>
            </div>
          </div>
        </div>
        <Filter />
        <Cards cases={cases} withActions={false} withIncludes={true} />
      </React.Fragment>
    );
  }
}

export default ProfileView;
