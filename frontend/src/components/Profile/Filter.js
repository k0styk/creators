import React from 'react';
import s from './Profile.module.scss';
import FilterComponent from '../../shared/Filter';
import {Button} from '@material-ui/core';

class Filter extends React.Component {
    mock = [
        {label: 'sd', value: 1},
    ]

    render() {
        return (
            <React.Fragment>
                <div className={s.filterTitle}>
                    Услуги автора
                </div>
                <FilterComponent withButton={true}/>
            </React.Fragment>
        );
    }
}

export default Filter;
