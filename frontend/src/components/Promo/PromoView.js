import React from 'react';
import {inject} from "mobx-react";
import s from './Promo.module.scss';
import YouTube from "react-youtube";
import {Avatar, Link, Button, Paper, Divider, Chip} from "@material-ui/core";
import MediaBlock from './MediaBlock';
import Card from "../../shared/PromoCard";
import Cards from "../../shared/PromoCard/Cards";
import Breadcrumbs from '../../shared/NavBar';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

@inject(({PromoStore}) => {
    return {
        price: PromoStore.price,
        promo: PromoStore.promo,
        user: PromoStore.promo.user || {},
        userPromos: PromoStore.userPromos,
        type: PromoStore.promo.type,
        sphere: PromoStore.promo.sphere
    };
})
class Search extends React.Component {
    render() {
        const {
            user,
            promo,
            userPromos,
            type,
            sphere
        } = this.props;

        const breadcrumbs = [
            {title: 'Видео'},
            {title: type},
            {title: sphere},
        ]
        return (
            <div className={s.body}>
                <div className={s.title}>
                    {promo.title}
                    <div className={s.city}>
                        <LocationCityIcon className={s.cityIcon}/>
                        <span>
                            {promo.city}
                        </span>
                    </div>

                </div>
                <MediaBlock/>
                <Breadcrumbs
                    className={s.breadcrumbs}
                    items={breadcrumbs}
                />
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
                        <span className={s.moreWorks}>
                            все работы
                            <NavigateNextIcon
                            className={s.navNext}/>
                        </span>
                    </Link>
                </div>
                <Cards promos={userPromos}/>
            </div>
        );
    }
}

export default Search;
