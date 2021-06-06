import React from 'react';
import {Provider} from "mobx-react";
import ChatView from './ChatView';
import {inject} from 'mobx-react';
import CaseStore from '../../stores/Case';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

       this.CaseStore = new CaseStore({RouterStore});
    }

    render() {
        return (
           <Provider CaseStore={this.CaseStore}>
                <ChatView />
           </Provider>
        );
    }
}
export default PersonalPage;
