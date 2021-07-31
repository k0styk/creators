import React from 'react';
import s from './header.module.scss';
import {Button, Menu, MenuItem, Avatar} from '@material-ui/core';
import {Link} from "react-router-dom";
import {inject} from "mobx-react";

@inject(({UserStore}) => {
    return {
        user: UserStore.user || {},
        logout: UserStore.logout,
        userId: UserStore.userId
    };
})
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    handleCloseLogout = () => {
        const {logout} = this.props;
        logout();
        this.handleClose()
    }


    render() {
        const {anchorEl} = this.state;
        const {user, userId, withName = true} = this.props;
        return (
            <React.Fragment>
                <Button onClick={this.handleClick} className={s.userButton}>
                    {withName && user?.firstName}
                    <Avatar
                        className={s.avatar}
                        alt={user?.firstName}
                        src={user?.photoPath}
                    />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={!!anchorEl}
                    onClose={this.handleClose}
                >
                    {
                        userId &&
                        <React.Fragment>
                            <Link to={`/lk`} className={s.menuItem}>
                                <MenuItem>
                                    Личный кабинет
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={this.handleCloseLogout}>
                                Выход
                            </MenuItem>
                        </React.Fragment>
                        || <Link to={`/login`} className={s.menuItem}>
                            <MenuItem>
                                Вход
                            </MenuItem>
                        </Link>
                    }
                </Menu>
            </React.Fragment>
        );
    }
}

export default Header;