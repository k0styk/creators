import React from 'react';
import {inject, Provider} from "mobx-react";
import SearchView from './SearchView';
import SearchStore from "../../stores/CaseList/SearchStore";

@inject(({RouterStore}) => {
    return {RouterStore};
})
class Search extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.SearchStore = new SearchStore({RouterStore});
    }

    render() {
        return (
            <Provider SearchStore={this.SearchStore}>
                <SearchView />
            </Provider>
        );
    }
}
export default Search;
