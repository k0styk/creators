import React from 'react';
import s from './Favorites.module.scss';
import Cards from "../../shared/CaseCard";
import { inject } from "mobx-react";
import {status as statusEnum} from '../../enums';
import Loader from '../../shared/Loader';
import Error from '../../shared/Error';

@inject(({ FavoritesStore }) => {
    return {
        cases: FavoritesStore.cases || [],
        setFavorite: FavoritesStore.setFavorite,
        status: FavoritesStore.status
    };
})
class Content extends React.Component {
    render() {
        const {
            cases,
            setFavorite,
            status
        } = this.props;

        if (status === statusEnum.ERROR) {
            return <Error/>
        }
        if (status === statusEnum.LOADING) {
            return <Loader/>
        }

        if (!cases.length) {
            return <div className={s.helperText}>
                У вас еще нет избранных кейсов :(
            </div>
        }
        return (
            <Cards
                setFavorite={setFavorite}
                cases={cases}
                withIncludes={true}
            />
        );
    }

}

export default Content;
