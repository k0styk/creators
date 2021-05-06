import React from 'react';
import {inject} from "mobx-react";
import s from './PersonalPage.module.scss';
import {Tooltip, IconButton, Divider, Chip} from "@material-ui/core";
import Card from "../../../shared/PromoCard";
import AddIcon from '@material-ui/icons/Add';
import Cards from "../../../shared/PromoCard/Cards";
import EditIcon from '@material-ui/icons/Edit';

@inject(({PersonalPageStore}) => {
    return {
        price: PersonalPageStore.price
    };
})
class PersonalPage extends React.Component {
    render() {
        const {price} = this.props;
        const cards = [];
        for (let i = 1; i < 3; i++) {
            cards.push(<Card withActions={true} withIncludes={false}/>);
        }

        return (
            <div className={s.content}>
                <div>
                    <div className={s.userName}>
                        <span> Алексей Стен</span>
                        <Tooltip placement="right" title={'Редактировать'}>
                            <IconButton size='small' color="primary">
                                <EditIcon className={s.addIcon}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={s.avatar}>
                        <img
                            src={'https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album'}
                        />
                    </div>
                    <div className={s.field}>
                        <span className={s.titleField}> Город </span>
                        <span> Москва</span>
                    </div>
                    <div className={s.field}>
                        <span className={s.titleField}> Телефон </span>
                        <span>  +7 999 999 99 99 </span>
                    </div>
                    <div className={s.field}>
                        <span className={s.titleField}> Почта </span>
                        <span>  zakazchik@mail.ru </span>
                    </div>
                    <div className={s.field}>
                        <span className={s.titleField}> Баланс </span>
                        <span>  28 000 руб </span>
                    </div>
                </div>
                <div>
                    <div className={s.userInfo}>
                        <div>
                            <span className={s.titleField}>Деятельность </span>
                            <span>
                            <Chip className={s.chip} label='фото' size="small"/>
                        </span>
                        </div>
                        <div>
                            <span className={s.titleField}>Сферы клиентов  </span>
                            <span>
                            <Chip className={s.chip} size="small" label='недвижимость'/>
                        </span>
                        </div>
                        <div>
                            <span className={s.titleField}>Количество кейсов  </span>
                            <span className={s.valueField}>
                             <Chip className={s.chip} size="small" label='25'/>
                        </span>
                        </div>
                        <div><span className={s.titleField}>Средняя стоимость работ </span>
                            <span>
                            <Chip className={s.chip} size="small" label='28 000 руб.'/>
                        </span>
                        </div>
                        <div><span className={s.titleField}> О себе </span>
                            <span>
                            В основном занимаюсь видео для строительных компаний уже более 3 лет.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis
                    pellentesque metus id lacinia. Nunc dapibus pulvinar auctor. Duis nec sem at orci
                    commodo viverra id in ipsum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis
                    pellentesque metus id lacinia. Nunc dapibus pulvinar auctor. Duis nec sem at orci
                    commodo viverra id in ipsum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </span>
                        </div>
                    </div>
                    <div className={s.works}>
                            <span className={s.titleWorks}> Ваши кейсы
                                <Tooltip placement="right" title={'Создать кейс'}>
                                    <IconButton size='small' color="primary">
                                    <AddIcon className={s.addIcon}/>
                                </IconButton>
                                </Tooltip>
                                 </span>
                        <Divider/>
                        <Cards promos={cards}/>
                        <span className={s.titleWorks}>Исполненные заказы </span>
                        <Divider/>
                        <Cards promos={cards}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonalPage;
