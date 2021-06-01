import React from 'react';
import s from './Home.module.scss';
import Cards from '../../shared/PromoCard/Cards';
import {inject} from "mobx-react";

@inject(({HomeStore}) => {
    return {
        promos: HomeStore.recommendations
    };
})
class Recommendations extends React.Component {
    render() {
        const {promos} = this.props;

        return (
            <div className={s.recommendationsContainer}>
                <div className={s.title}> Рекоммендуем</div>
                <Cards promos={promos}/>
            </div>
        );
    }
}

export default Recommendations;
