import React from 'react';
import {inject} from "mobx-react";
import s from './Promo.module.scss';
import YouTube from "react-youtube";
import {
    Avatar,
    Button,
    Link,
    Paper
} from "@material-ui/core";
import CheckboxList from "./CheckboxList";

@inject(({PromoStore}) => {
    return {
        price: PromoStore.price,
        productionTime: PromoStore.promo.productionTime,
        type: PromoStore.promo.type,
        sphere: PromoStore.promo.sphere,
        youtubeId: PromoStore.promo.youtubeId,
        user: PromoStore.promo.user || {}
    };
})
class Search extends React.Component {
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
        const {
            price,
            productionTime,
            user,
            youtubeId
        } = this.props;

        return (
            <Paper className={s.content} elevation={3}>
                <YouTube
                    className={s.iframe}
                    videoId={youtubeId}
                    opts={this.opts}
                />
                <div className={s.info}>
                    <div className={s.header}>
                        <div>
                            <span className={s.titleS}>
                                Стоимость: {price} руб.
                            </span>
                            <span className={s.descTitle}>
                                Срок изготовления: {productionTime}
                            </span>
                        </div>
                        <Link
                            className={s.user}
                            href={`/profile/${user.id}`}
                        >
                            {user.firstName}
                            <Avatar
                                alt={user.firstName}
                                src={user.photoPath}
                            />
                        </Link>
                    </div>
                    <div>
                    </div>
                    <span className={s.titleBox}>
                        Что включено
                    </span>
                    <CheckboxList/>
                    <Button
                        variant='contained'
                        size={'small'}
                        color={'primary'}
                        className={s.buttonLink}
                    >
                        Перейти к странице заказа
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default Search;
