import React from 'react';
import {inject} from "mobx-react";
import s from './Create.module.scss';
import {TextField} from "@material-ui/core";
import YouTube from "react-youtube";
import Select from "../../shared/Select";
import BlockField from "../../shared/BlockField";

@inject(({CreateStore}) => {
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
        selectedTypes:CreateStore.selectedTypes,
        selectedSpheres: CreateStore.selectedSpheres
    };
})
class CreateView extends React.Component {
    opts = {
        playerVars: {
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            fs: 0,
            loop: 1,
            controls: 0
        },
    };

    render() {
        const {
            youtubeId,
            setYoutubeId,
            title,
            setTitle,
            types,
            spheres,
            changeAddress,
            addresses,
            city,
            onChangeCity,
            onChangeSpheres,
            onChangeTypes
        } = this.props;


        const cityOptions = [
            {id: 'helper', label: 'Введите город', isDisabled: true},
            {id: 0, label: 'Не имеет значения'}
        ]

        return (
            <div className={s.videoBlock}>
                <YouTube
                    className={s.video}
                    videoId={youtubeId}
                    opts={this.opts}
                />
                <div>
                    <BlockField
                        isRequiered={true}
                        title={'Ссылка на youtube'}
                        value={<TextField size={'small'}
                                          onChange={setYoutubeId}/>}
                    />
                    <BlockField
                        isRequiered={true}
                        title={'Название'}
                        value={<TextField size={'small'}
                                          value={title}
                                          onChange={setTitle}/>}
                    />
                    <BlockField
                        isRequiered={true}
                        title={'Сфера кейса'}
                        value={<Select size={'small'}
                                       options={spheres}
                                       onChange={onChangeSpheres}
                        />}
                    />
                    <BlockField
                        isRequiered={true}
                        title={'Тип видеоролиĸа'}
                        value={<Select size={'small'}
                                       options={types}
                                       onChange={onChangeTypes}
                        />}
                    />
                    <BlockField
                        title={'Город'}
                        value={<Select
                            value={city}
                            onChange={onChangeCity}
                            size={'small'}
                            loadOptions={changeAddress}
                            options={addresses}
                            defaultOptions={cityOptions}
                        />}
                    />
                </div>
            </div>
        );
    }
}

export default CreateView;
