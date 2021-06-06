import React from 'react';
import {inject} from "mobx-react";
import s from './PersonalPage.module.scss';
import {Tooltip, IconButton, Divider} from "@material-ui/core";
import Card from "../../../shared/CaseCard";
import AddIcon from '@material-ui/icons/Add';
import Index from "../../../shared/CaseCard";

@inject(({PersonalPageStore}) => {
    return {
        price: PersonalPageStore.price
    };
})
class PersonalPage extends React.Component {
    render() {
        const cards = [];
        for (let i = 1; i < 3; i++) {
            cards.push(<Card withActions={true} withIncludes={false}/>);
        }

        return (
            <div className={s.user}>
                <div className={s.info}>
                    <span className={s.userName}>Алексей Стен</span>
                    <div className={s.avatar}>
                        <img
                            src={'https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album'}
                        />
                    </div>

                    <div>
                        <span className={s.titleField}> Город </span>
                        <span> Москва</span>
                    </div>
                    <div>
                        <span className={s.titleField}> Телефон </span>
                        <span>  +7 999 999 99 99 </span>
                    </div>
                    <div>
                        <span className={s.titleField}> Почта </span>
                        <span>  zakazchik@mail.ru </span>
                    </div>
                    <div>
                        <span className={s.titleField}> Баланс </span>
                        <span>  28 000 руб </span>
                    </div>

                </div>
                <div className={s.info}>
                    <div className={s.works}>
                            <span className={s.titleWorks}>Активные заказы
                                <Tooltip placement="right" title={'Сделать заказ'}>
                                    <IconButton size='small' color="primary">
                                    <AddIcon className={s.addIcon}/>
                                </IconButton>
                                </Tooltip>
                                 </span>
                        <Divider/>
                        <Index cases={cards}/>
                        <span className={s.titleWorks}>Исполненные заказы </span>
                        <Divider/>
                        <Index cases={cards}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonalPage;
