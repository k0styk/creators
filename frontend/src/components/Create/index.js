import React from 'react';
import {Provider} from "mobx-react";
import PromoStore from '../../stores/Promo';
import CreateView from './CreateView';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.PromoStore = new PromoStore({RouterStore});
    }

    render() {
        return (
            <Provider PromoStore={this.PromoStore}>
                  <CreateView />
            </Provider>
        );
    }
}
export default PersonalPage;
