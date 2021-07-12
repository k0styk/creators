import './register.scss';
import React from 'react';

import {
    Button,
    InputLabel,
    InputAdornment,
    IconButton,
    Input,
    FormControl,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';

import AuthService from '../../api/auth/auth.service';

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

const RegisterPage = ({ socket, setUser, notify, setLoader }) => {
    // const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        repeat: '',
        roleTypeId: 1,
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleChangeRole = (event) => {
        setValues({
            ...values,
            roleTypeId: +event.target.checked,
        });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const registerUser = (e) => {
        e.preventDefault();
        // const { email, password } = values;

        try {
            AuthService.register(values)
                .then((data) => {
                    // need to redirect and store
                    localStorage.setItem('user', JSON.stringify(data));
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
            <form onSubmit={registerUser}>
                <div className="card">
                    <div className="cardHeader">Регистрация</div>
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
                        <div className={classes.marginSides}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">
                                    Повторите пароль
                                </InputLabel>
                                <Input
                                    fullWidth
                                    maxLength="30"
                                    id="rpassword"
                                    type={
                                        values.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={values.repeat}
                                    onChange={handleChange('repeat')}
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
                        <div className={classes.marginSides}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!values.roleTypeId}
                                        onChange={handleChangeRole}
                                        name="role"
                                        color="primary"
                                    />
                                }
                                label="Вы креатор?"
                            />
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

export default RegisterPage;
