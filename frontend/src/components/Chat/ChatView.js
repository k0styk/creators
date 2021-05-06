import React from 'react';
import {inject} from "mobx-react";
import s from './Chat.module.scss';
import {Tooltip, IconButton, Divider, Avatar, Button} from "@material-ui/core";
import CheckboxList from "./CheckboxList";

// @inject(({ChatStore}) => {
//     return {
//         price: ChatStore.price
//     };
// })
class PersonalPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className={s.title}>
                        Заказ
                    </div>
                    <Divider/>
                    <div className={s.content}>
                        <div className={s.chat}>
                            Чат
                        </div>
                        <div className={s.info}>
                            <div className={s.header}>
                                <div>
                                    <span className={s.price}> Стоимость: 4 руб. </span>
                                    <span className={s.dates}> Срок изготовления: 14 дней </span>
                                </div>
                                <div className={s.user}>
                                    Cindy Baker
                                    <Avatar
                                        alt="Cindy Baker"
                                        src="https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album"/>

                                </div>
                            </div>
                            <span className={s.titleBox}>Что включено </span> <CheckboxList/>
                            <Button
                                variant='contained'
                                size={'small'}
                                color={'primary'}
                                className={s.buttonLink}
                            > Оплатить </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PersonalPage;
