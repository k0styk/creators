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
import PersonIcon from "@material-ui/icons/Person";

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

export default function MediaCard(props) {
    const classes = useStyles();

    const {
        withIncludes,
        withActions = true,
        photoPath,
        title,
        price,
        youtubeId,
        firstName,
        createdAt
    } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="iframe"
                    className={classes.media}
                    image={`https://www.youtube.com/embed/${youtubeId}`}
                />

                <CardContent
                    className={classes.content}
                >
                    <div className={s.header}>
                        <span className={s.date}> {createdAt}</span>
                        <span className={s.videoTitle}>{title}</span>
                        <span className={s.price}>
                            {price && `${price} руб` || 'Не указано'}
                        </span>
                        {
                            withIncludes &&
                            <span className={s.inludes}>
             Включено:
                <span> <CheckIcon className={s.checkIcon}/> Съемка </span>
                <span> <CheckIcon className={s.checkIcon}/>  Монтаж </span>
                <span> <CheckIcon className={s.checkIcon}/> Цветокоррекция </span>
                <span>  <CheckIcon className={s.checkIcon}/> Инфографика </span>
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
                            alt={firstName}
                            src={photoPath}
                        />
                        {firstName}
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
