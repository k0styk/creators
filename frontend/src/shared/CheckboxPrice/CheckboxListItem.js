import React from 'react';
import {
  Checkbox,
  ListItemText,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  TextField,
} from '@material-ui/core';
import s from './Checkbox.module.scss';
import formatPrice from '../../tools/formatPrice';
import TooltipService from '../TootlipService';

export default function CheckboxList({
  serviceId,
  name,
  price,
  tooltipText,
  checked,
  onClick,
  withPriceField,
  onPriceChange,
  prices,
  tooltipAdditional,
  tooltipAdditionalType,
}) {
  const isChecked = checked.includes(serviceId);

  return (
    <ListItem dense button>
      <ListItemIcon>
        <Checkbox
          onClick={() => onClick(serviceId)}
          edge="start"
          checked={isChecked}
          disableRipple
          inputProps={{ 'aria-labelledby': 1 }}
        />
      </ListItemIcon>

      <ListItemText>
        <div className={s.titleCheckbox}>
          <span> {name} </span>
          {(!withPriceField && (
            <span className={s.priceService}>{formatPrice(price)}</span>
          )) ||
            (isChecked && withPriceField && (
              <div className={s.textFieldBlock}>
                <span className={s.dopField}> Стоимость: </span>
                <TextField
                  value={prices[serviceId]}
                  size={'small'}
                  color={'secondary'}
                  className={s.textField}
                  onChange={({ target }) =>
                    onPriceChange(formatPrice(target.value, false), serviceId)
                  }
                />
                <span className={s.dopField}> руб. </span>
              </div>
            ))}
        </div>
      </ListItemText>

      <ListItemSecondaryAction>
        <TooltipService
          text={tooltipText}
          tooltipAdditional={tooltipAdditional}
          tooltipAdditionalType={tooltipAdditionalType}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
