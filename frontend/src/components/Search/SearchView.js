import React from 'react';
import s from './Search.module.scss';
import Filter from '../../shared/Filter';
import Cards from "../../shared/CaseCard";
import {inject, Provider} from "mobx-react";
import {toJS} from "mobx";
import {status as statusEnum} from '../../enums';
import Loader from '../../shared/Loader';
import Error from '../../shared/Error';
import Header from './Header';
import Content from './Content';

@inject(({SearchStore}) => {
    return {
        status: SearchStore.status
    };
})
class Search extends React.Component {
    render() {
        const {
            status
        } = this.props;

        if (status === statusEnum.ERROR) {
            return <Error/>
        }
        if (status === statusEnum.LOADING) {
            return <Loader/>
        }

        return (
            <div>
                <Header/>
                <Content />
            </div>
        );
    }

}

export default Search;
