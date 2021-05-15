import React from 'react';
import s from './Filter.module.scss';
import Select from '../Select';
import TextField from '../BlockField';
import {Button} from '@material-ui/core';

class Filter extends React.Component {
    mock = [
      {label: 'sd', value: 1},
    ]
    render() {
      const {withButton} = this.props;

      return (
        <div className={s.filter}>
          <div>
            <span className={s.titleField}>Сфера</span>
            <Select
              placeholder={'Выберете сферу'}
              options = {this.mock}
            />
          </div>
          <div>
            <span className={s.titleField}>Тип видео </span>
            <Select
              placeholder={'Выберите тип видео'}
              options = {this.mock}
            />
          </div>
          <div>
            <span className={s.titleField}>Длительность </span>
            <Select
              placeholder={'Выберите длительность'}
              options = {this.mock}
            />
          </div>
          <div>
            <span className={s.titleField}>Город </span>
            <Select
              placeholder={'Город'}
              options = {this.mock}
            />
          </div>
          <div >
            <span className={s.titleField}>Цена </span>
            <div className={s.priceBlock}>
              <TextField
                className={s.priceField}
                placeholder={'От'}
                variant={'outlined'}
              />
              <span className={s.divider}>  -  </span>
              <TextField
                className={s.priceField}
                placeholder={'До'}
                variant={'outlined'}
              />
              <span className={s.divider}>  руб.  </span>
            </div>
          </div>
          <div className = {s.button}>
            {
              withButton && <Button color={'primary'} variant={'contained'} > Найти </Button>
            }
          </div>
        </div>
      );
    }
}

export default Filter;
