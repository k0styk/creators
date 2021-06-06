import React from 'react';
import s from './Home.module.scss';
import Index from '../../shared/CaseCard';
import {inject} from "mobx-react";

@inject(({HomeStore}) => {
    return {
        cases: HomeStore.recommendations
    };
})
class Recommendations extends React.Component {
    render() {
        const {cases} = this.props;

        return (
            <div className={s.recommendationsContainer}>
                <div className={s.title}> Рекомендуем</div>
                <Index cases={cases}/>
            </div>
        );
    }
}

export default Recommendations;
