import '../Auth.scss';
import React from 'react';
import {
    Button,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject(({ AuthStore }) => {
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
    };
})
class RegisterPage extends React.Component {
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
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
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
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={setIsCreator}
                                checked={!!isCreator}
                                name="role"
                                color="primary"
                            />
                        }
                        label="Вы креатор?"
                    />
                </div>
                <div className="button-block">
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={registerUser}
                    >
                        Зарегистрироваться
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
