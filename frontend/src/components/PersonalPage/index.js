import React from 'react';
import {Provider} from "mobx-react";
import PersonalPageStore from '../../stores/PersonalPage';
import PersonalPageView from './PersonalPageView';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.PersonalPageStore = new PersonalPageStore({RouterStore});
    }

    render() {
        return (
            <Provider PersonalPageStore={this.PersonalPageStore}>
                <PersonalPageView />
            </Provider>
        );
    }
}
export default PersonalPage;
