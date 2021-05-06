import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {
    Checkbox,
    Tooltip,
    ListItemText,
    List,
    ListItem,
    ListItemIcon,
    SecondaryAction,
    IconButton,
    ListItemSecondaryAction
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import s from './Promo.module.scss';
import CheckboxListItem from './CheckboxListItem';
import Search from "./PromoView";
import {inject} from "mobx-react";

const CheckList = withStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        maxHeight: '250px',
        minHeight: 'min-content',
        overflowY: 'auto',
        marginTop: '10px',
        padding: 0,
        border: '1px solid  rgba(146, 153, 167, .1)'
    }
}))(List);

@inject(({PromoStore}) => {
    return {
        checked: PromoStore.checked,
        items: PromoStore.items,
        onCheckService: PromoStore.onCheckService
    };
})
class CheckboxList extends React.Component {
    render() {
        const {checked, items, onCheckService} = this.props;
        const listItem = items.map((item) => <CheckboxListItem {...item} checked={checked} onClick={onCheckService}/>)

        return (
            <CheckList>
                {listItem}
            </CheckList>
        );
    }
}

export default CheckboxList;
