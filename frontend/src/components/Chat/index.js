import React from 'react';
import { Provider } from 'mobx-react';
import ChatView from './ChatView';
import { inject } from 'mobx-react';
import ChatStore from '../../stores/Chat';

@inject(({ RouterStore, SocketStore }) => {
  return { RouterStore, SocketStore };
})
class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    const { RouterStore, SocketStore } = this.props;

    this.ChatStore = new ChatStore({ RouterStore, SocketStore });
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
