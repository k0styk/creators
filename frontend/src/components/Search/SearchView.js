import React from 'react';
import s from './Search.module.scss';
import Filter from '../../shared/Filter';
import Cards from "../../shared/PromoCard/Cards";
import {inject, Provider} from "mobx-react";
import {toJS} from "mobx";
import {status as statusEnum} from '../../enums';
import Loader from '../../shared/Loader';
import ClearIcon from '@material-ui/icons/Clear';
import {IconButton, Tooltip} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

@inject(({SearchStore}) => {
    return {
        status: SearchStore.status,
        promos: toJS(SearchStore.promos) || [],
        filterIsEmpty: SearchStore.filterIsEmpty,
        clear: SearchStore.clear,
        SearchStore
    };
})
class Search extends React.Component {
    render() {
        const {
            SearchStore,
            status,
            promos,
            filterIsEmpty,
            clear
        } = this.props;
        console.log(promos);

        return (
            <div>
                <div className={s.title}>
                    Видео
                    {
                        !filterIsEmpty && (
                            <Tooltip placement="right"
                                     title={'Очистить фильтр'}
                                     onClick={clear}>
                                <IconButton
                                    color="secondary"
                                    size="small">
                                    <ClearIcon
                                        className={s.clearButton}/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </div>
                <Provider FilterStore={SearchStore}>
                    <Filter withButton={true}/>
                </Provider>
                {
                    status === statusEnum.LOADING && <Loader/>
                }
                {
                    status === statusEnum.SUCCESS && (
                        promos.length &&
                        <React.Fragment>
                            <div className={s.helperText}> Вот, что мы нашли по вашему запросу</div>
                            <Cards promos={promos} withIncludes={true}/>
                        </React.Fragment> ||
                        <div className={s.helperText}> Мы ничего не нашли :(</div>

                    )
                }
                {
                    status === statusEnum.ERROR && (
                        <React.Fragment>
                            <div className={s.helperText}> Упс...</div>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default Search;
