import React from 'react';
import s from './Search.module.scss';
import Cards from "../../shared/CaseCard";
import {inject} from "mobx-react";
import {Divider} from '@material-ui/core';

@inject(({SearchStore}) => {
    return {
        cases: SearchStore.cases || [],
        setFavorite: SearchStore.setFavorite,
        urlIsEmpty: SearchStore.urlIsEmpty,
    };
})
class Content extends React.Component {
    render() {
        const {
            cases,
            urlIsEmpty,
            setFavorite
        } = this.props;

        if (!cases.length) {
            return <div className={s.helperText}>
                Мы ничего не нашли :(
            </div>
        }
        return (
            <React.Fragment>
                {
                    !urlIsEmpty && <React.Fragment>
                        <div className={s.helperText}>
                            Вот, что мы нашли по вашему запросу
                        </div>
                        <Divider/>
                    </React.Fragment>
                }
                <Cards setFavorite={setFavorite} cases={cases} withIncludes={true}/>
            </React.Fragment>
        );
    }

}

export default Content;
