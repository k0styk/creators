import React from 'react';
import {Provider} from 'mobx-react';
import PersonalPageStore from '../../stores/PersonalPage';
import CreatorView from './Creator/PersonalPageView';
import ClientView from './Client';
import {inject} from 'mobx-react';
import {userType} from '../../enums';

@inject(({RouterStore, UserStore}) => {
    return {
        user: UserStore.user,
        RouterStore
    };
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

        this.PersonalPageStore = new PersonalPageStore({RouterStore});
    }

    render() {
        const {user} = this.props;

        return (
            <Provider PersonalPageStore={this.PersonalPageStore}>
                {(user.type === userType.CONSUMER && <ClientView/>) || <CreatorView/>}
            </Provider>
        );
    }
}

export default PersonalPage;
