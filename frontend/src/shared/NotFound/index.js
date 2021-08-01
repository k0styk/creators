import React from 'react';
import s from "./style.module.scss";
import WarningIcon from '@material-ui/icons/Warning';
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className={s.blockError}>
            <WarningIcon className={s.iconError}/>
            Страница не найдена

            <Link to={`/`} className={s.homeLink}>На главную</Link>
        </div>

    )
}

export default NotFound;
