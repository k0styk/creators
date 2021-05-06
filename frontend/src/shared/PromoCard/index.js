import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  Avatar,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
} from '@material-ui/core';
import s from './Card.module.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    border: 0,
  },
  content: {
    padding: '10px 16px',
  },
});

export default function MediaCard({withIncludes, withActions = true}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="iframe"
          className={classes.media}
          image="https://www.youtube.com/embed/961Ttgo-jZI"
        />

        <CardContent
          className={classes.content}
        >
          <div className={s.header}>
            <span className={s.date}> 13 Apr 2021</span>
            <span className={s.videoTitle}>
              Рекламное видео для производства
            </span>
            <span className={s.price}>
            7 000 руб.
            </span>
            {
              withIncludes &&
              <span className={s.inludes}>
             Включено:
                <span> <CheckIcon className={s.checkIcon}/> Съемка </span>
                <span> <CheckIcon className={s.checkIcon} />  Монтаж </span>
                <span> <CheckIcon className={s.checkIcon} /> Цветокоррекция </span>
                <span>  <CheckIcon className={s.checkIcon} /> Инфографика </span>
              </span>
            }
          </div>
        </CardContent>
      </CardActionArea>
      {
        withActions && <CardActions className={s.actions}>
          <div className={s.user}>
            <Avatar
                className={s.avatar}
                alt="Cindy Baker"
                src="https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album"/>
            Cindy Baker
          </div>
          <IconButton
              size={'small'}
          > <FavoriteBorderIcon className={s.favIcon}/>
          </IconButton>
        </CardActions>
      }
    </Card>
  );
}
