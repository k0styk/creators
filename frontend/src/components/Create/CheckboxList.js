import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {List} from '@material-ui/core';
import CheckboxListItem from '../../shared/CheckboxPrice/CheckboxListItem';
import {inject} from "mobx-react";
import CreateStore from "../../stores/Create";
import s from "./Create.module.scss";
import {action} from "mobx";

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

@inject(({CreateStore}) => {
    return {
        checkedMainServices: CreateStore.checkedMainServices,
        checkedAddServices: CreateStore.checkedAddServices,
        services: CreateStore.services,
        onCheckAddService:  CreateStore.onCheckAddService,
        onCheckMainService:  CreateStore.onCheckMainService,
        addServices: CreateStore.addServices,
        onPriceChange:  CreateStore.onPriceChange,
        prices: CreateStore.prices
    };
})
class CheckboxList extends React.Component {
    render() {
        const {
            services,
            checkedMainServices,
            checkedAddServices,
            onCheckAddService,
            onCheckMainService,
            addServices,
            onPriceChange,
            prices
        } = this.props;

        const listItemMainServices = services.map((item) => <CheckboxListItem
            {...item}
            checked={checkedMainServices}
            onClick={onCheckMainService}
            withPriceField={true}
            onPriceChange={onPriceChange}
            prices={prices}
        />)

        const listItemAddServices = addServices.map((item) => <CheckboxListItem
            {...item}
            checked={checkedAddServices}
            onClick={onCheckAddService}
            withPriceField={true}
            onPriceChange={onPriceChange}
            prices={prices}
        />)

        return (

            <div className={s.services}>
                <div className={s.titleBox}>
                    Укажите, что включено в эту стоимость <span className={s.isRequiered}> * </span>
                </div>
                <div className={s.titleBox}>
                    Вы также можете указать дополнительные услуги за дополнительную стоимость </div>
                <div>
                    <CheckList>
                        {listItemMainServices}
                    </CheckList>
                </div>
                <div>
                    <CheckList>
                        {listItemAddServices}
                    </CheckList>
                </div>
            </div>


        );
    }
}

export default CheckboxList;
