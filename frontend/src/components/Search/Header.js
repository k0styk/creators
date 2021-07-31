import React from 'react';
import s from './Search.module.scss';
import {inject, Provider} from "mobx-react";
import {Avatar} from '@material-ui/core';
import {Link} from "react-router-dom";
import Filter from "../../shared/Filter";


@inject(({SearchStore}) => {
    return {
        userId: SearchStore.userId,
        user: SearchStore.user,
        SearchStore
    };
})
class Header extends React.Component {
    render() {
        const {
            user,
            userId,
            SearchStore
        } = this.props;

        return (
            <React.Fragment>
                <div className={s.header}>
                    {
                        !!userId && <Link to={`/profile/${userId}`}>
                            <div className={s.user}>
                          <span className={s.avatar}>
                            <Avatar
                                sizes={'30px'}
                                alt={user.firstName}
                                src={user.photoPath}
                            />
                          </span>
                                {`${user.firstName} ${user.secondName}`}
                            </div>
                        </Link>
                    }
                    <div className={s.title}>
                        {userId && 'Кейсы исполнителя' || 'Кейсы'}
                    </div>
                </div>
                <Provider FilterStore={SearchStore}>
                    <Filter withButton={true}/>
                </Provider>
            </React.Fragment>
        );
    }

}

export default Header;
