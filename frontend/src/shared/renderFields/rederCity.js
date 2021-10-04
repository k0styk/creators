import s from './style.module.scss';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import React from 'react';

const City = ({ city }) => (
  <div className={s.city}>
    <LocationCityIcon className={s.cityIcon} />
    <span>{city?.name || city}</span>
  </div>
);
export default City;
