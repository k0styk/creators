import React from 'react';
import {inject} from "mobx-react";
import s from './Promo.module.scss';
import YouTube from "react-youtube";
import {Avatar, Link, Button, Paper, Divider} from "@material-ui/core";
import CheckboxList from './CheckboxList';
import Card from "../../shared/PromoCard";
import Cards from "../../shared/PromoCard/Cards";

@inject(({PromoStore}) => {
    return {
        price: PromoStore.price
    };
})
class Search extends React.Component {
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
        for (let i =1; i<5; i++) {
            cards.push( <Card withActions={false}/>);
        }

        return (
            <div className={s.body}>
                <div className={s.title}>
                    Рекламный ролик "ПромСтройСервис"
                </div>
                <Paper className={s.content} elevation={3}>
                    <YouTube
                        className={s.iframe}
                        videoId={'X_8O-RvbYwM'}
                        opts={this.opts}
                    />
                    <div className={s.info}>
                        <div className={s.header}>
                            <div>
                                <span className={s.price}> Стоимость: {price} руб. </span>
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
                        > Перейти к странице заказа </Button>
                    </div>
                </Paper>
                <div className={s.desc}>
                    <Divider/>
                    <span className={s.descTitle}> Описание </span>
                    <span className={s.descText}>
                        Делаю видео для строительных компаний уже более 3-х лет. Знаю все тонкости съемки на строительных объектах, а также все
техники безопасности, чтобы вы не угадили на штраф. В заказ подобного видео входит 2 дня съемки: 1 день в офисе и 1 день на
строительном объекте.через 5 дней после съемок вы увидите смонтированное видео, а еще через 7 уже полностью готовое с
цветокоррекцией и саунддизайном.
                    </span>
                    <Divider/>
                </div>
              <div className={s.more}>Еще работы от Алексей Стен
                  <Link
                  color={'primary'}
                  className={s.buttonLink}
              >все работы </Link>
              </div>
                <Cards promos={cards}/>
            </div>
        );
    }
}

export default Search;
