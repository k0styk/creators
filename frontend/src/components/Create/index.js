import React from 'react';
import {Provider} from "mobx-react";
import CreateStore from '../../stores/Create';
import CreateView from './CreateView';
import CaseStore from '../../stores/Case';
import {inject} from 'mobx-react';
import {userType as userTypeEnum} from '../../enums';
import NotFound from '../../shared/NotFound';

@inject(({RouterStore, UserStore}) => {
    return {
        RouterStore,
        userType: UserStore.user?.type
    };
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.CreateStore = new CreateStore({RouterStore});
        this.CaseStore = new CaseStore({RouterStore});
    }

    render() {
        const {userType} = this.props;

        if (userType === userTypeEnum.CONSUMER) {
            return <NotFound/>
        }

        return (
            <Provider CaseStore={this.CaseStore} CreateStore={this.CreateStore}>
                <CreateView/>
            </Provider>
        );
    }
}

export default PersonalPage;
