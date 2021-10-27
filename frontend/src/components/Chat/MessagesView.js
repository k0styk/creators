import React from 'react';
import s from './Chat.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { Button, IconButton, TextField, Divider } from '@material-ui/core';
import { inject } from 'mobx-react';

import MessagesList from './MessagesList';
import ServicesView from './ServicesView';
import Loader from '../../shared/Loader';
import { chatEnum } from '../../enums';

@inject(({ ChatStore }) => {
  return {
    text: ChatStore.text,
    setText: ChatStore.setText,
    selectDialog: ChatStore.selectDialog,
    sendMessage: ChatStore.sendMessage,
    loadMessagesStatus: ChatStore.loadMessagesStatus,
  };
})
class MessagesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messaging: false,
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const { text, sendMessage, setText } = this.props;

    if (this.state.messaging) return;
    const content = text && text.trim();
    if (!content) return;

    this.setState((state) => ({ ...state, messaging: true }));

    sendMessage(text);

    setTimeout(() => {
      this.setState((state) => ({ ...state, messaging: false }));
    }, 250);
    setText({ target: { value: '' } });
  }

  render() {
    const { selectDialog, text, setText, loadMessagesStatus } = this.props;

    return (
      <>
        {loadMessagesStatus === chatEnum.IS_CHECKING ? (
          <Loader />
        ) : (
          <>
            <div className={s.messages}>
              <div className={s.closeButton} onClick={() => selectDialog()}>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
              <MessagesList />
              <div className={s.inputBlock}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <TextField
                    name="Message"
                    placeholder="Введите сообщение"
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    value={text}
                    onChange={setText}
                  />
                  <Button
                    className={s.button}
                    variant="outlined"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    <SendIcon />
                  </Button>
                  <input type="submit" style={{ display: 'none' }} />
                </form>
              </div>
            </div>
            <Divider orientation="vertical" />
            <ServicesView />
          </>
        )}
      </>
    );
  }
}

export default MessagesView;
