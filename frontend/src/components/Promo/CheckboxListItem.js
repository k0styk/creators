import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {
    Checkbox,
    Tooltip,
    ListItemText,
    List,
    ListItem,
    ListItemIcon as ListItemIconUi,
    SecondaryAction,
    IconButton,
    ListItemSecondaryAction
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import s from './Promo.module.scss';

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

export default function CheckboxList({id, title, price, tooltip, checked, onClick}) {
    return (
        <ListItem key={id} dense button onClick={() => onClick(id)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.includes(id)}
                    disableRipple
                    inputProps={{'aria-labelledby': 1}}
                />
            </ListItemIcon>

            <ListItemText>
                <div className={s.titleCheckbox}>
                    <span> {title} </span>
                    <span className={s.priceService}> {price} руб. </span>
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
