import React from 'react';
import s from './../main.module.scss';
import {AppBar, Toolbar, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuBlock from './Menu';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import UserBlock from './UserBlock';

const useStyles = makeStyles((theme) => ({
    appBarClient: {
        background: '#288ad6',
        padding: '0 10%',
    },
    appBarCreator: {
        background: '#35d219',
        padding: '0 10%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function Header({userType = false}) {
    const classes = useStyles();

    return (
        <AppBar className={userType && classes.appBarCreator || classes.appBarClient} position="fixed">
            <Toolbar className={s.toolbar}>
                <MenuBlock/>
                <div>
                    <IconButton>
                        <NotificationsNoneIcon className={s.favIcon}/>
                    </IconButton>
                    <IconButton>
                        <FavoriteBorderIcon className={s.favIcon}/>
                    </IconButton>
                    <UserBlock/>
                </div>
            </Toolbar>
        </AppBar>
    );
}


