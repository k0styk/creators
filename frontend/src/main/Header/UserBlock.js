import React from 'react';
import s from './../main.module.scss';
import {Button, Menu, MenuItem, Avatar} from '@material-ui/core';
import {Link} from "react-router-dom";

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClick} className={s.userButton}>
                Кристина
                <Avatar
                    className={s.avatar}
                    alt="Cindy Baker"
                    src="https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album"/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
            >
                <Link to={`/lk`} className={s.menuItem}>
                    <MenuItem>
                        Личный кабинет
                    </MenuItem>
                </Link>
                <MenuItem>
                    Выход
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}


