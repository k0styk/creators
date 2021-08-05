import React from 'react';
import s from './header.module.scss';
import {
    SwipeableDrawer,
    ListItemText,
    ListItemIcon,
    ListItem,
    List,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { userType as userTypeEnum } from '../../enums';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Header({ userType }) {
    const [anchorEl, setAnchorEl] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {
            title: 'Главная',
            link: '/',
            icon: <HomeIcon />,
        },
        {
            title: 'Поиск',
            link: '/search',
            icon: <SearchIcon />,
        },
        {
            title: 'Избранное',
            link: '/favorites',
            icon: <FavoriteIcon />,
        },
        {
            title: 'Личный кабинет',
            link: '/lk',
            icon: <PersonIcon />,
        },
    ];

    if (userType === userTypeEnum.CREATOR) {
        menuItems.push({
            title: 'Создать кейс',
            link: '/create',
            icon: <AddIcon />,
        });
    }

    if (!userType) {
        menuItems.push(
            {
                title: 'Регистрация',
                link: '/register',
                icon: <AccountCircleIcon />,
            },
            {
                title: 'Вход',
                link: '/login',
                icon: <ExitToAppIcon />,
            }
        );
    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                id="simple-menu"
                anchor={'left'}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
                onOpen={handleClick}
            >
                <List className={s.menu}>
                    {menuItems.map(({ title, link, icon }) => (
                        <Link
                            key={title}
                            onClick={handleClose}
                            to={link}
                            className={s.menuItem}
                        >
                            <ListItem className={s.listItem}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </SwipeableDrawer>
        </div>
    );
}
