import React from 'react';
import {Provider} from "mobx-react";
import ChatView from './ChatView';
import {inject} from 'mobx-react';
import ChatStore from '../../stores/Chat';

@inject(({RouterStore}) => {
    return {RouterStore};
})
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        const {RouterStore} = this.props;

       this.ChatStore = new ChatStore({RouterStore});
    }

    render() {
        return (
           <Provider ChatStore={this.ChatStore}>
                <ChatView />
           </Provider>
        );
    }
}
export default PersonalPage;
