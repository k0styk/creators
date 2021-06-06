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
        clear: FilterStore.clear
    };
})
class Filter extends React.Component {
    times = [
        {label: 'до 15 сеĸ', value: 1, to: '15'},
        {label: '15-30 сеĸ', value: 2, from: '15', to: '30'},
        {label: '30-60 сеĸ', value: 3, from: '30', to: '60'},
        {label: '1-3 мин', value: 4, from: '60', to: '180'},
        {label: '3-10 мин', value: 5, from: '180', to: '600'},
        {label: 'более 10 мин', value: 6, from: '600'}
    ];

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
            clear
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
                            options={this.times}
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
