import './login.scss';
import React from 'react';

import {
    Button,
    InputLabel,
    InputAdornment,
    IconButton,
    Input,
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import {inject} from "mobx-react";

@inject(({AuthStore}) => {
    return {
        login: AuthStore.loginUser,
        email: AuthStore.email,
        password: AuthStore.password,
        showPassword: AuthStore.showPassword,
        setPassword: AuthStore.setPassword,
        setEmail: AuthStore.setEmail,
        toggleShowPassword: AuthStore.toggleShowPassword
    };
})

class LoginPage extends React.Component {
    render() {
        const {
            login,
            email,
            password,
            showPassword,
            setPassword,
            setEmail,
            toggleShowPassword
        } = this.props;

        return (
            <div className="card">
                <div className="cardHeader">
                    Авторизация
                </div>
                <div className={"cardBody"}>
                    <div>
                        <InputLabel htmlFor="login">Email</InputLabel>
                        <Input
                            fullWidth
                            maxLength="30"
                            id="login"
                            value={email}
                            onChange={setEmail}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="password">
                            Пароль
                        </InputLabel>
                        <Input
                            fullWidth
                            maxLength="30"
                            id="password"
                            type={showPassword}
                            value={password}
                            onChange={setPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                    >
                                        {
                                            showPassword ? (<Visibility/>) : (<VisibilityOff/>)
                                        }
                                    </IconButton>
                                </InputAdornment>
                            }
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
            </div>
        );
    };
}

export default LoginPage;
