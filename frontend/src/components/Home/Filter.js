import React from 'react';
import s from './Home.module.scss';
import FilterComponent from '../../shared/Filter';
import {Button} from '@material-ui/core';

class Filter extends React.Component {
    mock = [
      {label: 'sd', value: 1},
    ]
    render() {
      return (
        <div className={s.filter}>
          <div className={s.filterTitle}>
                    Выбери критерии и начни поиск
          </div>
          <FilterComponent/>
          <div className={s.centerButton}>
            <Button
              variant ='contained'
              size={'medium'}
              color={'primary'}
            > Найти подходящего креатора
            </Button>
          </div>
        </div>
      );
    }
}

export default Filter;
