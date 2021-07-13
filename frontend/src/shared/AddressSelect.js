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
    } = props;
    const cityOptions = [
        {id: 'helper', name: 'Введите город', isDisabled: true},
        {id: 0, name: 'Не имеет значения'}
    ]

    return (
        <Select
            getOptionLabel={({name})=>name}
            value={city}
            onChange={onChangeCity}
            size={'small'}
            loadOptions={changeAddress}
            defaultOptions={cityOptions}
        />
    )
}

export default SelectAddress;
