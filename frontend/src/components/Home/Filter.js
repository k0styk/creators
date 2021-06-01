import React from 'react';
import s from './Home.module.scss';
import FilterComponent from '../../shared/Filter';
import {Button} from '@material-ui/core';
import {inject} from 'mobx-react';
import {Provider} from "mobx-react";

@inject(({HomeStore}) => {
    return {
        search: HomeStore.search,
        HomeStore
    };
})
class Filter extends React.Component {
    render() {
        const {HomeStore, search} = this.props;

        return (
            <div className={s.filter}>
                <div className={s.filterTitle}>
                    Выбери критерии и начни поиск
                </div>
                <Provider FilterStore={HomeStore}>
                    <FilterComponent storeName = {'HomeStore'}/>
                </Provider>
                <div className={s.centerButton}>
                    <Button
                        onClick={search}
                        variant='contained'
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
