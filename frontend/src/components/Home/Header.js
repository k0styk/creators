import React from 'react';
import s from './Home.module.scss';
import logo from '../../shared/logo.png';
import YouTube from 'react-youtube';
import WorkIcon from '@material-ui/icons/WorkOutline';
import {Avatar, CardActions, IconButton} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Header extends React.Component {
  //opts вынести в шаред
    opts = {
      playerVars: {
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        fs: 0,
        loop: 1,
        width: 560,
        height: 315,
        controls: 0,
      },
    };
    render() {
      return (
        <div className={s.headerContainer}>
          <div className={s.header}>
            <div className={s.right}>
              <img src = {logo} alt = "Logo" className={s.logo}/>
              <span> Creators</span>
            </div>
            <div className={s.left}>
              <div className={s.user}>
                <IconButton
                  color={'primary'}
                  size={'large'}
                > <FavoriteBorderIcon className={s.favIcon}/>
                </IconButton>
                <Avatar
                  className={s.avatar}
                  alt="Cindy Baker"
                  src="https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album"/>
              </div>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.helperText}>
              <span>Посмотри видео, чтобы узнать </span>
              <span className={s.bold}> КАК НАЙТИ ПОДХОДЯЩЕГО КРЕАТОРА </span>
              <div className={s.link}>
                <WorkIcon className={s.workIcon}/> cтать исполнителем
              </div>
            </div>
            <YouTube
              className={s.video}
              videoId={'X_8O-RvbYwM'}
              opts={this.opts}
            />
          </div>
        </div>
      );
    }
}

export default Header;
