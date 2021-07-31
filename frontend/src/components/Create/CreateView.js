import React from 'react';
import {inject} from "mobx-react";
import s from './Create.module.scss';
import {TextField, Divider, Button} from "@material-ui/core";
import CheckboxList from "./CheckboxList";
import MediaBlock from './MediaBlock';

@inject(({CreateStore}) => {
    return {
        onChangeDesc: CreateStore.onChangeDesc,
        desc: CreateStore.desc,
        sumbit: CreateStore.sumbit
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
        const {onChangeDesc, desc, sumbit} = this.props;

        return (
            <React.Fragment>
                <div className={s.title}>
                    Создание кейса
                </div>
                <MediaBlock/>
                <CheckboxList/>
                <Divider/>
                <TextField
                    onChange={onChangeDesc}
                    value={desc}
                    size={'small'}
                    label="Описание"
                    multiline
                    rows={4}
                    className={s.desc}
                    variant={"outlined"}/>

                <Button
                    variant='contained'
                    size={'small'}
                    color={'primary'}
                    className={s.buttonSumbit}
                    onClick={sumbit}
                > Отправить кейс на проверку </Button>
            </React.Fragment>
        );
    }
}

export default CreateView;
