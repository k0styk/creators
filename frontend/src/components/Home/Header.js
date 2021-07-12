import React from 'react';
import s from './Home.module.scss';
import logo from '../../shared/logo.png';
import YouTube from 'react-youtube';
import WorkIcon from '@material-ui/icons/WorkOutline';
import {IconButton} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {inject} from "mobx-react";
import {Link} from "react-router-dom";
import UserBlock from '../Header/UserBlock';

@inject(({UserStore}) => {
  return {
    user: UserStore.user || {}
  };
})
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
      const {user} = this.props;
      return (
        <div className={s.headerContainer}>
          <div className={s.header}>
            <div className={s.right}>
              <img
                  src = {logo}
                  alt = "Logo"
                  className={s.logo}
              />
              <span> Creators</span>
            </div>
            <div className={s.left}>
              <div className={s.user}>
                <Link to={`favorites`}>
                  <IconButton
                      color={'primary'}
                  > <FavoriteBorderIcon className={s.favIcon}/>
                  </IconButton>
                </Link>
                <UserBlock withName={false}/>
              </div>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.helperText}>
              <span>Посмотри видео, чтобы узнать </span>
              <span className={s.bold}>
                КАК НАЙТИ ПОДХОДЯЩЕГО КРЕАТОРА
              </span>
              <div className={s.link}>
                <WorkIcon className={s.workIcon}/>
                cтать исполнителем
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
