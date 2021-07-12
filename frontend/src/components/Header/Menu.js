import React from 'react';
import s from './header.module.scss';
import {SwipeableDrawer, ListItemText, ListItemIcon, ListItem, List, IconButton,} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {
            title: 'Главная', link: '/', icon: <HomeIcon/>
        },
        {
            title: 'Поиск', link: '/search', icon: <SearchIcon/>
        },
        {
            title: 'Личный кабинет', link: '/lk', icon: <PersonIcon/>
        }
    ];

    return (
        <div>
            <IconButton
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="menu">
                <MenuIcon/>
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
                    {
                        menuItems.map(({title, link, icon}) => <Link to={link} className={s.menuItem}>
                            <ListItem>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={title}/>
                            </ListItem>
                        </Link>)
                    }
                </List>
            </SwipeableDrawer>
        </div>
    );
}


