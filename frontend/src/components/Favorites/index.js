import React from 'react';
import {Provider} from "mobx-react";
import FavoritesView from './FavoritesView';
import FavoritesStore from "../../stores/CaseList/FavoritesStore";

class Favorites extends React.Component {
    constructor(props) {
        super(props);

        this.FavoritesStore = new FavoritesStore();
    }

    render() {
        return (
            <Provider FavoritesStore={this.FavoritesStore}>
                <FavoritesView />
            </Provider>
        );
    }
}
export default Favorites;
