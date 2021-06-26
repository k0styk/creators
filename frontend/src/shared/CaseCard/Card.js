import React from 'react';
import {
    Card,
    CardActionArea,
    Avatar,
    CardMedia,
    CardActions,
    CardContent,
    IconButton,
} from '@material-ui/core';
import s from './Cards.module.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CheckIcon from '@material-ui/icons/Check';
import formatPrice from '../../tools/formatPrice';
import {inject} from "mobx-react";
import {Link} from "react-router-dom";

@inject(({RouterStore}) => {
    return {RouterStore};
})
class MediaCard extends React.Component {

    onClick = () => {
        const {id, RouterStore} = this.props;
        RouterStore.history.push(`/case/${id}`);
    }

    render() {
        const {
            withIncludes,
            withActions = true,
            user,
            title,
            price,
            youtubeId,
            createdAt
        } = this.props;

        return (
            <Card className={s.root}>
                <CardActionArea onClick={this.onClick}>
                    <CardMedia
                        component="iframe"
                        className={s.media}
                        image={`https://www.youtube.com/embed/${youtubeId}`}
                    />

                    <CardContent
                        className={s.content}
                    >
                        <div className={s.header}>
                        <span className={s.date}>
                            {createdAt}
                        </span>
                            <span className={s.videoTitle}>
                            {title && title.length > 60 ? `${title.slice(0, 60)}...` : title}
                        </span>
                            <span className={s.price}>
                            {price && `${formatPrice(price)}` || 'Стоимость не указана'}
                        </span>
                            {
                                withIncludes &&
                                <span className={s.inludes}>
                                Включено:
                                <span> <CheckIcon className={s.checkIcon}/> Съемка </span>
                                <span> <CheckIcon className={s.checkIcon}/> Монтаж </span>
                                <span> <CheckIcon className={s.checkIcon}/> Цветокоррекция </span>
                                <span>  <CheckIcon className={s.checkIcon}/> Инфографика </span>
                            </span>
                            }
                        </div>
                    </CardContent>
                </CardActionArea>
                {
                    withActions && <CardActions className={s.actions}>
                        <Link to={`profile/${user.id}`}>
                            <div className={s.user}>
                                <Avatar
                                    className={s.avatar}
                                    alt={user.firstName}
                                    src={user.photoPath}
                                />
                                {user.firstName}
                            </div>
                        </Link>
                        <IconButton
                            size={'small'}
                        > <FavoriteBorderIcon className={s.favIcon}/>
                        </IconButton>
                    </CardActions>
                }
            </Card>
        );
    }
}

export default MediaCard;