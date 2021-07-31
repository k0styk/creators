import React from 'react';
import Select from "./Select";
import getAddress from "../api/dadata";

const SelectAddress = (props) => {
    const changeAddress = (value) => {
        return getAddress(value);
    }
    const {
        city,
        onChangeCity,
        withNull
    } = props;
    const cityOptions = withNull && [
        {id: 'helper', name: 'Введите город', isDisabled: true},
        {id: 0, name: 'Не имеет значения'}
    ] || [{id: 'helper', name: 'Введите город', isDisabled: true}]

    return (
        <Select
            getOptionLabel={({name}) => name}
            value={city}
            onChange={onChangeCity}
            size={'small'}
            loadOptions={changeAddress}
            defaultOptions={cityOptions}
        />
    )
}

export default SelectAddress;
