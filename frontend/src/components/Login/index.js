import './login.scss';
import React from 'react';

import {
    Button,
    InputLabel,
    InputAdornment,
    IconButton,
    Input,
    FormControl,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';

import AuthService from '../../services/auth.service';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    marginSides: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
}));

const LoginPage = ({ socket, setUser, notify, setLoader }) => {
    // const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginUser = (e) => {
        e.preventDefault();
        // const { email, password } = values;

        try {
            AuthService.login(values)
                .then((data) => {
                    localStorage.setItem('user', JSON.stringify(data));
                    // need to redirect
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={loginUser}>
                <div className="card">
                    <div className="cardHeader">Авторизация</div>
                    <div className="cardBody">
                        <div className={classes.marginSides}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="login">Email</InputLabel>
                                <Input
                                    fullWidth
                                    maxLength="30"
                                    id="login"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    autoComplete="off"
                                />
                            </FormControl>
                        </div>
                        <div className={classes.marginSides}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">
                                    Пароль
                                </InputLabel>
                                <Input
                                    fullWidth
                                    maxLength="30"
                                    id="password"
                                    type={
                                        values.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                            >
                                                {values.showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className="button-block">
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            ВОЙТИ
                        </Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default LoginPage;
