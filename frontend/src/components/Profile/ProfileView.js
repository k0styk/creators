import React from 'react';
import {inject} from "mobx-react";
import s from './Profile.module.scss';
import {Chip, Button, Divider} from "@material-ui/core";
import Card from "../../shared/PromoCard";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Filter from "./Filter";
import Cards from "../../shared/PromoCard/Cards";

@inject(({ProfileStore}) => {
    return {
        price: ProfileStore.price
    };
})
class ProfileView extends React.Component {
    //opts вынести в шаред
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
        const {price} = this.props;
        const cards = [];
        for (let i = 1; i < 7; i++) {
            cards.push(i);
        }

        return (
            <React.Fragment>
                <div className={s.body}>
                    <div className={s.leftSide}>
                        <div className={s.avatar}>
                            <img
                                src={'https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album'}
                            />
                        </div>
                        <Button
                            variant='contained'
                            size={'small'}
                            color={'primary'}
                            className={s.connectButton}
                            endIcon={<QuestionAnswerIcon/>}
                        > Связаться </Button>
                    </div>
                    <div className={s.user}>
                        <span className={s.userName}>Алексей Стен</span>
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
                </div>
                <Divider />
                <Filter/>
                <Cards promos={cards} withActions={true} withIncludes={true}/>
            </React.Fragment>
        );
    }
}

export default ProfileView;
