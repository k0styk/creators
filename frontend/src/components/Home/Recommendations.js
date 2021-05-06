import React from 'react';
import s from './Home.module.scss';
import Cards from '../../shared/PromoCard/Cards';

class Recommendations extends React.Component {
    render() {
        const cards = [];
        for (let i = 1; i < 9; i++) {
            cards.push({val: i});
        }
        return (
            <div className={s.recommendationsContainer}>
                <div className={s.title}> Рекоммендуем</div>
                <Cards promos={cards}/>
            </div>
        );
    }
}

export default Recommendations;
