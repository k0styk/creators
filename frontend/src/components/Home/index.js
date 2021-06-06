import React from 'react';
import {inject, Provider} from "mobx-react";
import HomeStore from '../../stores/CaseList/HomeStore';

import HomeView from './HomeView';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class Search extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;
        this.HomeStore = new HomeStore({RouterStore});
    }

    render() {
        return (
            <Provider HomeStore={this.HomeStore}>
                <HomeView />
            </Provider>
        );
    }
}
export default Search;
