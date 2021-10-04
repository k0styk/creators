import React from 'react';
import {
  Card,
  CardActionArea,
  Avatar,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Chip,
} from '@material-ui/core';
import s from './Cards.module.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckIcon from '@material-ui/icons/Check';
import formatPrice from '../../tools/formatPrice';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

dayjs.locale('RU');

@inject(({ RouterStore }) => {
  return { RouterStore };
})
class MediaCard extends React.Component {
  onClick = () => {
    const { id, RouterStore } = this.props;
    RouterStore.history.push(`/case/${id}`);
  };

  setFavorite = () =>
    this.props.setFavorite(this.props.id, !this.props.inFavorite);

  render() {
    const {
      withIncludes,
      withActions = true,
      user,
      title,
      price,
      youtubeId,
      createdAt,
      inFavorite,
      services,
      sphere,
      type,
    } = this.props;

    return (
      <Card className={s.root}>
        <CardActionArea onClick={this.onClick}>
          <CardMedia
            component="iframe"
            className={s.media}
            image={`https://www.youtube.com/embed/${youtubeId}`}
          />

          <CardContent className={s.content}>
            <div className={s.header}>
              <span className={s.date}>
                {createdAt && dayjs(createdAt).format('MMM D, YYYY hh:mm')}
              </span>
              <span className={s.types}>
                <Chip className={s.chipSphere} label={sphere} size="small" />
                <Chip className={s.chipType} label={type} size="small" />
              </span>
              <span className={s.videoTitle}>
                {title && title.length > 50
                  ? `${title.slice(0, 50)}...`
                  : title}
              </span>
              <span className={s.price}>
                {price ? `${formatPrice(price)}` : 'Стоимость не указана'}
              </span>
              {withIncludes && services && services.length ? (
                <span className={s.inludes}>
                  Включено:
                  {services.map((service) => (
                    <span key={service.name}>
                      {' '}
                      <CheckIcon className={s.checkIcon} /> {service.name}{' '}
                    </span>
                  ))}
                </span>
              ) : null}
            </div>
          </CardContent>
        </CardActionArea>
        {withActions && (
          <CardActions className={s.actions}>
            <Link to={`/profile/${user.id}`}>
              <div className={s.user}>
                <Avatar
                  className={s.avatar}
                  alt={user.firstName}
                  src={user.photoPath}
                />
                {user.firstName}
              </div>
            </Link>
            <IconButton onClick={this.setFavorite} size={'small'}>
              {(inFavorite && <FavoriteIcon className={s.favIconEn} />) || (
                <FavoriteBorderIcon className={s.favIconDis} />
              )}
            </IconButton>
          </CardActions>
        )}
      </Card>
    );
  }
}

export default MediaCard;
