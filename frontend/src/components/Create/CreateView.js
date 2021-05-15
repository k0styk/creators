import React from 'react';
import {inject} from "mobx-react";
import s from './Create.module.scss';
import {Tooltip,TextField, IconButton, Divider, Chip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import YouTube from "react-youtube";
import CheckboxList from "./CheckboxList";
import MediaBlock from './MediaBlock';
import CreateStore from "../../stores/Create";

@inject(({CreateStore}) => {
    return {
        price: CreateStore.price
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
        return (
            <React.Fragment>
                <div className={s.title}>
                    Создание кейса
                </div>
                <MediaBlock/>
                <div className={s.services}>
                    <div className={s.titleBox}>
                        Укажите, что включено в эту стоимость
                    </div>
                    <div className={s.titleBox}>
                        Вы также можете указать дополнительные услуги за дополнительную стоимость </div>
                    <div>
                        <CheckboxList/>
                    </div>
                    <div>
                        <CheckboxList/>
                    </div>
                </div>
                <Divider />
                <TextField
                    size={'small'}
                    label="Описание"
                    multiline
                    rows={4}
                    className={s.desc}
                    variant={"outlined"}/>
            </React.Fragment>
        );
    }
}

export default CreateView;
