import React from 'react';
import { inject } from 'mobx-react';
import s from './Create.module.scss';
import { TextField, InputAdornment } from '@material-ui/core';
import YouTube from 'react-youtube';
import Select from '../../shared/Select';
import BlockField from '../../shared/BlockField';
import Stepper from './Stepper';
import SelectAddress from '../../shared/AddressSelect';

@inject(({ CreateStore }) => {
    return {
        youtubeId: CreateStore.youtubeId,
        setYoutubeId: CreateStore.setYoutubeId,
        setTitle: CreateStore.setTitle,
        title: CreateStore.title,
        types: CreateStore.types,
        spheres: CreateStore.spheres,
        changeAddress: CreateStore.changeAddress,
        addresses: CreateStore.addresses,
        city: CreateStore.city,
        onChangeCity: CreateStore.onChangeCity,
        onChangeTypes: CreateStore.onChangeTypes,
        onChangeSpheres: CreateStore.onChangeSpheres,
        selectedTypes: CreateStore.selectedTypes,
        selectedSpheres: CreateStore.selectedSpheres,
        setTime: CreateStore.setTime,
        time: CreateStore.time,
    };
})
class CreateView extends React.Component {
    changeTime = (event, max, onChange) => {
        const newValue = event.target.value;
        event.target.value = newValue.replace(/\D+/g, '');

        if (Number(event.target.value) > max) {
            event.target.value = max;
        } else {
            event.target.value = Number(event.target.value);
        }
        this.props.setTime(onChange, event.target.value);
    };
    setDays = (event) => this.changeTime(event, 15, 'days');
    setMinutes = (event) => this.changeTime(event, 60, 'minutes');
    setHours = (event) => this.changeTime(event, 24, 'hours');

    render() {
        const {
            youtubeId,
            setYoutubeId,
            title,
            setTitle,
            types,
            spheres,
            city,
            onChangeCity,
            onChangeSpheres,
            onChangeTypes,
            time,
        } = this.props;

        return (
            <div className={s.videoBlock}>
                {youtubeId ? (
                    <YouTube
                        className={s.video}
                        videoId={youtubeId}
                        opts={this.opts}
                    />
                ) : (
                    <Stepper />
                )}
                <div>
                    <BlockField
                        isRequiered={true}
                        title={'Ссылка на youtube'}
                        value={
                            <TextField size={'small'} onChange={setYoutubeId} />
                        }
                    />
                    <BlockField
                        isRequiered={true}
                        title={'Название'}
                        value={
                            <TextField
                                size={'small'}
                                value={title}
                                onChange={setTitle}
                            />
                        }
                    />
                    <BlockField
                        isRequiered={true}
                        title={'Сфера кейса'}
                        value={
                            <Select
                                size={'small'}
                                options={spheres}
                                onChange={onChangeSpheres}
                            />
                        }
                    />
                    <BlockField
                        isRequiered={true}
                        title={'Тип видеоролиĸа'}
                        value={
                            <Select
                                size={'small'}
                                options={types}
                                onChange={onChangeTypes}
                            />
                        }
                    />

                    <BlockField
                        title={'Город'}
                        value={
                            <SelectAddress
                                withNull={true}
                                city={city}
                                onChangeCity={onChangeCity}
                            />
                        }
                    />
                    <BlockField
                        title={'Срок реализации'}
                        isRequiered={true}
                        value={
                            <div>
                                <TextField
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                д
                                            </InputAdornment>
                                        ),
                                    }}
                                    defaultValue={0}
                                    className={s.time}
                                    size={'small'}
                                    value={time.days}
                                    onChange={this.setDays}
                                />
                                <TextField
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                ч
                                            </InputAdornment>
                                        ),
                                    }}
                                    defaultValue={0}
                                    className={s.time}
                                    size={'small'}
                                    value={time.hours}
                                    onChange={this.setHours}
                                />
                                <TextField
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                м
                                            </InputAdornment>
                                        ),
                                    }}
                                    defaultValue={0}
                                    className={s.time}
                                    size={'small'}
                                    value={time.minutes}
                                    onChange={this.setMinutes}
                                />
                                <div className={s.maxTime}>
                                    {' '}
                                    Максимум 15 дней
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        );
    }
}

export default CreateView;
