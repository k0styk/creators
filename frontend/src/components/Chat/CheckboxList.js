import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import {List} from '@material-ui/core';
import CheckboxListItem from '../../shared/CheckboxPrice/CheckboxListItem';
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

@inject(({CaseStore}) => {
    return {
        checked: CaseStore.checked,
        items: CaseStore.items,
        onCheckService: CaseStore.onCheckService
    };
})
class CheckboxList extends React.Component {
    render() {
        const {checked, items, onCheckService} = this.props;
        const listItem = items.map((item) => <CheckboxListItem
            {...item}
            checked={checked}
            onClick={onCheckService}
        />)

        return (
            <CheckList>
                {listItem}
            </CheckList>
        );
    }
}

export default CheckboxList;
