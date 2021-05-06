import React from 'react';
import {Provider} from "mobx-react";
import PromoStore from '../../stores/Promo';
import PromoView from './PromoView';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class Search extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.PromoStore = new PromoStore({RouterStore});
    }

    render() {

        return (
            <Provider PromoStore={this.PromoStore}>
                <PromoView />
            </Provider>
        );
    }
}
export default Search;
