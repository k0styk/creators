import React from 'react';
import s from './Home.module.scss';
import logo from '../../shared/logo.png';
import YouTube from 'react-youtube';
import { inject } from 'mobx-react';
import UserBlock from '../Header/UserBlock';
import {Button} from '@material-ui/core';

@inject(({ UserStore, RouterStore }) => {
    return {
        user: UserStore.user || {},
        logout: UserStore.logout,
        userId: UserStore.userId,
        RouterStore: RouterStore,
    };
})
class Header extends React.Component {
    handleCreator = () => {
        const {RouterStore } = this.props;
        RouterStore.history.push('/register');
    };

    //opts вынести в шаред
    opts = {
        playerVars: {
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            fs: 0,
            loop: 1,
            controls: 0,
        },
    };

    render() {
        const {userId } = this.props;
        return (
            <div className={s.headerContainer}>
                <div className={s.header}>
                    <div className={s.left}>
                        <img src={logo} alt="Logo" className={s.logo} />
                        <span> Creators</span>
                    </div>
                    <div className={s.right}>
                        <div className={s.user}>
                            <UserBlock withName={false} />
                        </div>
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.helperText}>
                        <span>Посмотри видео, чтобы узнать </span>
                        <span className={s.bold}>
                            КАК НАЙТИ ПОДХОДЯЩЕГО КРЕАТОРА
                        </span>
                        {
                            !userId && <Button
                                variant={'contained'}
                                className={s.link}
                                onClick={this.handleCreator}
                            >
                                Зарегистрироваться
                            </Button>
                        }
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
