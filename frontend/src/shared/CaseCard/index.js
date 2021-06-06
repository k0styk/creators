import React from 'react';
import s from './Cards.module.scss';
import Card from './Card';

class Index extends React.Component {
    render() {
        const {cases = [], ...restProps} = this.props;
        const cardElements = cases.map((item) =>
            <Card
                key={item.id}
                {...item}
                {...restProps}
            />
        );

        return <div className={s.cards}>{cardElements}</div>;
    }
}

export default Index;
