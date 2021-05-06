import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Checkbox,
    Tooltip,
    ListItemText,
    ListItem,
    ListItemIcon as ListItemIconUi,
    IconButton,
    ListItemSecondaryAction, TextField
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import s from './Checkbox.module.scss';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);
const ListItemIcon = withStyles((theme) => ({
    root: {
        minWidth: '40px'
    }
}))(ListItemIconUi);

export default function CheckboxList({id, title, price, tooltip, checked, onClick, withPriceField}) {
    const isChecked = checked.includes(id);
    return (
        <ListItem key={id} dense button>
            <ListItemIcon>
                <Checkbox
                    onClick={() => onClick(id)}
                    edge="start"
                    checked={isChecked}
                    disableRipple
                    inputProps={{'aria-labelledby': 1}}
                />
            </ListItemIcon>

            <ListItemText>
                <div className={s.titleCheckbox}>
                    <span> {title} </span>
                    {
                        !withPriceField && <span className={s.priceService}> {price} руб. </span> ||
                        isChecked && withPriceField &&
                        (<div className={s.textFieldBlock}>
                            <span className={s.dopField}> Стоимость: </span>
                            <TextField
                                size={'small'}
                                color={'secondary'}
                                className={s.textField}/>
                            <span className={s.dopField}> руб. </span>
                        </div>)
                    }
                </div>
            </ ListItemText>

            <ListItemSecondaryAction>
                <LightTooltip placement="right" title={tooltip}>
                    <IconButton edge="end">
                        <HelpIcon className={s.helpIcon}/>
                    </IconButton>
                </LightTooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
