import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
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
import formatPrice from '../../tools/formatPrice';
import {inject} from "mobx-react";

@inject(({RouterStore}) => {
    return {RouterStore};
})
 class MediaCard extends React.Component {

    onClick = () =>{
        const {id, RouterStore} = this.props;
        RouterStore.history.push(`/promo/${id}`);
    }

     render() {
         const {
             withIncludes,
             withActions = true,
             photoPath,
             title,
             price,
             youtubeId,
             firstName,
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
                            {price && `${formatPrice(price)} руб` || 'Стоимость не указана'}
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
 }

export default MediaCard;