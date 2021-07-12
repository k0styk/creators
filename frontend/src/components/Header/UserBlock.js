import React from 'react';
import s from './header.module.scss';
import {Button, Menu, MenuItem, Avatar} from '@material-ui/core';
import {Link} from "react-router-dom";
import {inject} from "mobx-react";

@inject(({UserStore}) => {
    return {
        user: UserStore.user || {}
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


    render() {
        const {anchorEl} = this.state;
        const {user, withName = true} = this.props;
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
}

export default Header;