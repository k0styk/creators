import React from 'react';
import s from './Favorites.module.scss';
import Cards from "../../shared/CaseCard";
import {inject} from "mobx-react";

@inject(({FavoritesStore}) => {
    return {
        cases: FavoritesStore.cases || []
    };
})
class Content extends React.Component {
    render() {
        const {
            cases,
        } = this.props;

        if (!cases.length) {
            return <div className={s.helperText}>
                Чтобы добавьте то-то там-то
            </div>
        }
        return (
                <Cards cases={cases} withIncludes={true}/>
        );
    }

}

export default Content;
