import React from 'react';
import {Provider} from "mobx-react";
import CaseStore from '../../stores/Case';
import CaseView from './CaseView';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class Search extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.CaseStore = new CaseStore({RouterStore});
    }

    componentWillUnmount() {
        this.CaseStore.close();
    }

    render() {

        return (
            <Provider CaseStore={this.CaseStore}>
                <CaseView />
            </Provider>
        );
    }
}
export default Search;
