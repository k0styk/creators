import React from 'react';
import {Provider} from "mobx-react";
import ProfileStore from '../../stores/Profile';
import FilterStore from '../../stores/Profile/FilterStore';
import ProfileView from './ProfileView';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class Search extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.ProfileStore = new ProfileStore({RouterStore});
        this.FilterStore = new FilterStore({RouterStore});
    }

    render() {
        return (
            <Provider FilterStore={this.FilterStore} ProfileStore={this.ProfileStore}>
                <ProfileView />
            </Provider>
        );
    }
}
export default Search;
