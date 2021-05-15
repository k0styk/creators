import React from 'react';
import {Select as SelectUi, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import s from './Select.module.scss';
import ReactSelect from 'react-select';
import withStylesUi from '@material-ui/core/styles/withStyles';
import AsyncSelect from 'react-select/async';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        'padding': '0 2px',
        'borderColor': 'rgba(226, 226, 226, 0.6)',
        'boxShadow': state.isFocused ? '0 0px 4px rgba(233,245,245)' : 0,
        '&:hover': {
            'borderColor': 'rgba(217,217,217,0.83)',
        },
    }),
    placeholder: (provided, state) => ({
        ...provided,
        position: 'relative',
        whiteSpace: 'nowrap',
        opacity: state.isFocused ? 0.5 : 1,
        overflow: 'hidden',
        color: 'gray',
        textOverflow: 'ellipsis',
        transform: 'none',
    }),
    input: (provided, state) => ({
        ...provided,
        position: 'absolute',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        'padding': '0',
        'min-height': '15px',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        position: 'relative',
        whiteSpace: 'nowrap',
        opacity: state.isFocused ? 0.5 : 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transform: 'none',
    }),
};

class Index extends React.Component {
    defaultPlaceholder = 'Выберете значение'

    render() {
        const {placeholder, options, loadOptions} = this.props;

        const colourOptions = [
            {id: null, label: 'Не имеет значения'},
            {id: 0, label: 'Введите город', isDisabled: true}
            ]
        return (
            !loadOptions && <ReactSelect
                className={s.select}
                placeholder={placeholder || this.defaultPlaceholder}
                {...this.props}
                styles={customStyles}
                options={options}
            /> || <AsyncSelect
                className={s.select}
                placeholder={placeholder || this.defaultPlaceholder}
                {...this.props}
                styles={customStyles}
                loadOptions={loadOptions}
                cacheOptions
                defaultOptions={colourOptions}
            />
        )
    }
}

export default Index;
