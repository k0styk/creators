import React from 'react';
import {inject} from "mobx-react";
import s from './Create.module.scss';
import {Tooltip, TextField, IconButton, Divider, Chip} from "@material-ui/core";
import YouTube from "react-youtube";
import Select from "../../shared/Select";
import CreateStore from "../../stores/Create";

@inject(({CreateStore}) => {
    return {
        youtubeId: CreateStore.youtubeId,
        setYoutubeId: CreateStore.setYoutubeId,
        setTitle: CreateStore.setTitle,
        title: CreateStore.title,
        types: CreateStore.types,
        spheres: CreateStore.spheres,
        changeAddress: CreateStore.changeAddress,
        addresses: CreateStore.addresses
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
            addresses
        } = this.props;

        return (
            <div className={s.videoBlock}>
                <YouTube
                    className={s.video}
                    videoId={youtubeId}
                    opts={this.opts}
                />
                <div>
                    <div className={s.field}>
                            <span className={s.titleField}>
                                Ссылка на youtube
                            </span>
                        <TextField size={'small'} onChange={setYoutubeId}/>
                    </div>
                    <div className={s.field}>
                            <span className={s.titleField}>
                                Название
                            </span>
                        <TextField size={'small'} value={title} onChange={setTitle}/>
                    </div>
                    <div className={s.field}>
                            <span className={s.titleField}>
                                Сфера кейса
                            </span>
                        <Select size={'small'} options={spheres}/>
                    </div>
                    <div className={s.field}>
                            <span className={s.titleField}>
                                Тип видеоролиĸа
                            </span>
                        <Select size={'small'} options={types}/>
                    </div>
                    <div className={s.field}>
                            <span className={s.titleField}>
                                Город
                            </span>
                        <Select size={'small'} loadOptions={changeAddress} options={addresses}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateView;
