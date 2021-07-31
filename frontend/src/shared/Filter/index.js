import React from 'react';
import s from './Filter.module.scss';
import Select from '../Select';
import TextField from '../TextField';
import {Button} from '@material-ui/core';
import {inject} from "mobx-react";
import {toJS} from "mobx";
import ClearIcon from "@material-ui/icons/Clear";

@inject(({FilterStore = {}}) => {
    return {
        spheres: FilterStore.spheres,
        types: FilterStore.types,
        price: toJS(FilterStore.price) || {},
        setPrice: FilterStore.setPrice,
        setType: FilterStore.setType,
        setSphere: FilterStore.setSphere,
        setTime: FilterStore.setTime,
        selectedSphere: toJS(FilterStore.selectedSphere),
        selectedType: toJS(FilterStore.selectedType),
        time: FilterStore.time,
        search: FilterStore.search,
        fastFilter: FilterStore.fastFilter,
        setFastFilter: FilterStore.setFastFilter,
        filterIsEmpty: FilterStore.filterIsEmpty,
        clear: FilterStore.clear,
        times: FilterStore.times
    };
})
class Filter extends React.Component {

    setFromPrice = ({target}) => this.props.setPrice('from', target.value);
    setToPrice = ({target}) => this.props.setPrice('to', target.value);
    setFastFilter = ({target}) => this.props.setFastFilter(target.value);

    render() {
        const {
            types,
            spheres,
            withButton,
            price,
            setTime,
            setSphere,
            setType,
            search,
            selectedType,
            selectedSphere,
            time,
            fastFilter,
            filterIsEmpty,
            clear,
            times
        } = this.props;

        return (
            <div className={s.filterContainer}>
                <div className={s.filter}>
                    <div>
                        <span className={s.titleField}>Сфера</span>
                        <Select
                            isClearable
                            value={selectedSphere}
                            onChange={setSphere}
                            className={s.select}
                            placeholder={'Выберете сферу'}
                            options={spheres}
                        />
                    </div>
                    <div>
                        <span className={s.titleField}> Тип видео </span>
                        <Select
                            isClearable
                            value={selectedType}
                            onChange={setType}
                            className={s.select}
                            placeholder={'Выберите тип видео'}
                            options={types}
                        />
                    </div>
                    <div>
                        <span className={s.titleField}>Длительность </span>
                        <Select
                            isClearable
                            value={time}
                            onChange={setTime}
                            className={s.select}
                            placeholder={'Выберите длительность'}
                            options={times}
                        />
                    </div>
                    {/*<div>*/}
                    {/*    <span className={s.titleField}>Город </span>*/}
                    {/*    <Select*/}
                    {/*        placeholder={'Город'}*/}
                    {/*        options={this.mock}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <span className={s.titleField}>Цена </span>
                        <div className={s.priceBlock}>
                            <TextField
                                onChange={this.setFromPrice}
                                value={price.from}
                                className={s.priceField}
                                placeholder={'От'}
                                variant={'outlined'}
                            />
                            <span className={s.divider}>  -  </span>
                            <TextField
                                onChange={this.setToPrice}
                                value={price.to}
                                className={s.priceField}
                                placeholder={'До'}
                                variant={'outlined'}
                            />
                            <span className={s.divider}>  руб.  </span>
                        </div>
                    </div>
                </div>
                <div className={s.filter}>
                    <div>
                        <TextField
                            value={fastFilter}
                            onChange={this.setFastFilter}
                            className={s.fastFilter}
                            variant={'outlined'}
                            placeholder={'Найти кейс'}

                        />
                    </div>
                    <div className={s.button}>
                        {
                            withButton &&
                            <React.Fragment>
                                <Button
                                    onClick={search}
                                    color={'primary'}
                                    variant={'contained'}
                                >
                                    Найти
                                </Button>
                                {
                                    !filterIsEmpty &&
                                    <Button
                                        className={s.delBut}
                                        onClick={clear}
                                        color="secondary"
                                        startIcon={<ClearIcon className={s.clearButton}/>}
                                    >
                                        Очистить
                                    </Button>
                                }
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
