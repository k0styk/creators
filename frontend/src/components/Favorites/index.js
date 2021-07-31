import React from 'react';
import { Provider } from "mobx-react";
import FavoritesView from './FavoritesView';
import FavoritesStore from "../../stores/CaseList/FavoritesStore";
import { inject } from "mobx-react";

@inject(({ RouterStore }) => {
    return { RouterStore };
})
class Favorites extends React.Component {
    constructor (props) {
        super(props);
        const { RouterStore } = this.props;
        this.FavoritesStore = new FavoritesStore({ RouterStore });
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
