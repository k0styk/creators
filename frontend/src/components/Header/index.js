import React from 'react';
import s from './header.module.scss';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuBlock from './Menu';

import UserBlock from './UserBlock';
import { userType as userTypeEnum } from '../../enums';

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

export default function Header({ userType = false }) {
    const classes = useStyles();

    return (
        <AppBar
            className={
                (userType === userTypeEnum.CREATOR && classes.appBarCreator) ||
                classes.appBarClient
            }
            position="fixed"
        >
            <Toolbar className={s.toolbar}>
                <MenuBlock userType={userType} />
                <div>
                    <UserBlock />
                </div>
            </Toolbar>
        </AppBar>
    );
}
