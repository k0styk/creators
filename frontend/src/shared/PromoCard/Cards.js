import React from 'react';
import s from './Card.module.scss';
import Card from './index';

class Recommendations extends React.Component {
    render() {
        const {promos = [], ...restProps} = this.props;
        const cardElements = promos.map((item) => <Card key = {item.youtubeId} {...item} {...restProps}/>);

        return (
                <div className={s.cards}>{cardElements}</div>
        );
    }
}

export default Recommendations;
