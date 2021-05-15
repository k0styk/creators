import React from 'react';
import {Provider} from "mobx-react";
import CreateStore from '../../stores/Create';
import CreateView from './CreateView';
import PromoStore from '../../stores/Promo';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.CreateStore = new CreateStore({RouterStore});
        this.PromoStore= new PromoStore({RouterStore});
    }

    render() {
        return (
            <Provider PromoStore={this.PromoStore} CreateStore={this.CreateStore}>
                  <CreateView />
            </Provider>
        );
    }
}
export default PersonalPage;
