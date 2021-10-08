import '../Auth.scss';
import React from 'react';
import {
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Close } from '@material-ui/icons';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject(({ AuthStore, RouterStore }) => {
  return {
    login: AuthStore.loginUser,
    email: AuthStore.email,
    password: AuthStore.password,
    showPassword: AuthStore.showPassword,
    setPassword: AuthStore.setPassword,
    setEmail: AuthStore.setEmail,
    toggleShowPassword: AuthStore.toggleShowPassword,
    RouterStore,
  };
})
class LoginPage extends React.Component {
  toHome = () => {
    this.props.RouterStore.history.push({
      pathname: '/',
    });
  };

  render() {
    const {
      login,
      email,
      password,
      showPassword,
      setPassword,
      setEmail,
      toggleShowPassword,
    } = this.props;

    return (
      <div className="card">
        <div className="cardHeader">Авторизация</div>
        <IconButton className="close" onClick={this.toHome}>
          <Close />
        </IconButton>
        <div className={'cardBody'}>
          <div>
            <TextField
              fullWidth
              label={'Email'}
              value={email}
              onChange={setEmail}
              // autoComplete="off"
              placeholder={'Введите email'}
            />
          </div>
          <div>
            <TextField
              label={'Пароль'}
              placeholder={'Введите пароль'}
              fullWidth
              id="password"
              type={showPassword}
              value={password}
              onChange={setPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="button-block">
          <Button
            onClick={login}
            color="primary"
            variant="contained"
            type="submit"
          >
            ВОЙТИ
          </Button>
        </div>

        <Link to={`/register`} className={'registerLink'}>
          У вас нет аккаунта? Зарегистрируйтесь
        </Link>
      </div>
    );
  }
}

export default LoginPage;
