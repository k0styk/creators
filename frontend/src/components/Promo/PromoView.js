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
        price: PromoStore.price,
        promo: PromoStore.promo,
        user: PromoStore.promo.user || {},
        userPromos: PromoStore.userPromos
    };
})
class Search extends React.Component {
    render() {
        const {user, promo, userPromos} = this.props;

        return (
            <div className={s.body}>
                <div className={s.title}>
                    {promo.title}
                    <span className={s.city}>
                        {promo.city}
                    </span>
                </div>
                <MediaBlock/>
                <div className={s.desc}>
                    <Divider/>
                    <span className={s.descTitle}>
                        Описание
                    </span>
                    <span className={s.descText}>
                     {promo.desc || 'Не указано'}
                    </span>
                    <Divider/>
                </div>
                <div className={s.more}>
                    Еще работы автора
                    <Link
                        color={'primary'}
                        className={s.buttonLink}
                    >
                        все работы
                    </Link>
                </div>
                <Cards promos={userPromos}/>
            </div>
        );
    }
}

export default Search;
