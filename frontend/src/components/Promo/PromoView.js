import React from 'react';
import {inject} from "mobx-react";
import s from './Promo.module.scss';
import YouTube from "react-youtube";
import {Avatar, Link, Button, Paper, Divider} from "@material-ui/core";
import MediaBlock from './MediaBlock';
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

        const cards = [];
        for (let i =1; i<5; i++) {
            cards.push( <Card withActions={false}/>);
        }

        return (
            <div className={s.body}>
                <div className={s.title}>
                    Рекламный ролик "ПромСтройСервис"
                </div>
            <MediaBlock />
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
