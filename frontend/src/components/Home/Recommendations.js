import React from 'react';
import s from './Home.module.scss';
import Cases from '../../shared/CaseCard';
import {inject} from "mobx-react";

@inject(({HomeStore}) => {
    return {
        cases: HomeStore.cases,
        setFavorite: HomeStore.setFavorite
    };
})
class Recommendations extends React.Component {
    render() {
        const {cases, setFavorite} = this.props;

        return (
            <div className={s.recommendationsContainer}>
                <div className={s.title}> Рекомендуем</div>
                <Cases cases={cases} setFavorite={setFavorite}/>
            </div>
        );
    }
}

export default Recommendations;
