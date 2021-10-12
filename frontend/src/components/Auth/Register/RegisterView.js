import '../Auth.scss';
import React from 'react';
import {
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Grid,
  Switch,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Close } from '@material-ui/icons';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

@inject(({ AuthStore, RouterStore }) => {
  return {
    registerUser: AuthStore.registerUser,
    email: AuthStore.email,
    password: AuthStore.password,
    repeatPassword: AuthStore.repeatPassword,
    showPassword: AuthStore.showPassword,
    setPassword: AuthStore.setPassword,
    setRepeatPassword: AuthStore.setRepeatPassword,
    setEmail: AuthStore.setEmail,
    toggleShowPassword: AuthStore.toggleShowPassword,
    isCreator: AuthStore.isCreator,
    setIsCreator: AuthStore.setIsCreator,
    RouterStore,
  };
})
class RegisterPage extends React.Component {
  toHome = () => {
    this.props.RouterStore.history.push({
      pathname: '/',
    });
  };

  render() {
    const {
      email,
      password,
      repeatPassword,
      setRepeatPassword,
      showPassword,
      setPassword,
      setEmail,
      toggleShowPassword,
      registerUser,
      setIsCreator,
      isCreator,
    } = this.props;

    return (
      <div className="card">
        <div className="cardHeader">Регистрация</div>
        <IconButton className="close" onClick={this.toHome}>
          <Close />
        </IconButton>
        <div className="cardBody">
          <TextField
            fullWidth
            required
            label={'Email'}
            value={email}
            onChange={setEmail}
            autoComplete="off"
            placeholder={'Введите email'}
          />
          <TextField
            label={'Пароль'}
            placeholder={'Введите пароль'}
            fullWidth
            required
            id="password"
            type={showPassword}
            value={password}
            onChange={setPassword}
            helperText={'Пароль должен быь не меньше 6 символов'}
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
          <TextField
            label={'Повторите пароль'}
            placeholder={'Введите пароль'}
            fullWidth
            required
            type={showPassword}
            value={repeatPassword}
            onChange={setRepeatPassword}
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
          <FormGroup className="switchGroup">
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Заказчик</Grid>
                <Grid item>
                  <Switch
                    checked={!!isCreator}
                    onChange={setIsCreator}
                    color="primary"
                  />
                </Grid>
                <Grid item>Исполнитель</Grid>
              </Grid>
            </Typography>
          </FormGroup>
          {/* <FormControlLabel
            control={
              <Checkbox
                onChange={setIsCreator}
                checked={!!isCreator}
                name="role"
                color="primary"
              />
            }
            label="Вы креатор?"
          /> */}
        </div>
        <div className="button-block">
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={registerUser}
          >
            зарегистрироваться
          </Button>
        </div>

        <Link to={`/login`} className={'registerLink'}>
          Уже есть аккаунт?
        </Link>
      </div>
    );
  }
}

export default RegisterPage;
