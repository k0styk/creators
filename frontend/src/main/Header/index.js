import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './../main.module.scss';
import {AppBar, Button, Menu, MenuItem, Toolbar, IconButton, Typography, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#1976d2',
    padding: '0 10%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={s.toolbar}>
        <div>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6"> Creators </Typography>
        </div>
        <div>
          <IconButton
            size={'large'}
          > <NotificationsNoneIcon className={s.favIcon}/>
          </IconButton>
          <IconButton
            size={'large'}
          > <FavoriteBorderIcon className={s.favIcon}/>
          </IconButton>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>


        </div>
      </Toolbar>
    </AppBar>
  );
}


