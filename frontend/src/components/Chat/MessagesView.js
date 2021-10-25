import React from 'react';
import s from './Chat.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { Button, IconButton, TextField } from '@material-ui/core';
import { inject } from 'mobx-react';

import MessagesList from './MessagesList';

@inject(({ ChatStore }) => {
  return {
    text: ChatStore.text,
    setText: ChatStore.setText,
    selectDialog: ChatStore.selectDialog,
    sendMessage: ChatStore.sendMessage,
  };
})
class MessagesView extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const { text, sendMessage, setText } = this.props;

    // if (this.state.messaging) return;
    // const content = this.state.messageContent && this.state.messageContent.trim();
    // if (!content) return;

    // this.setState(state => ({...state, messaging: true}));

    sendMessage(text);

    // forbide too much talker
    // setTimeout(() => {
    //   this.setState(state => ({...state, messaging: false}))
    // }, 250)

    setText({ target: { value: '' } });
  }

  render() {
    const { selectDialog, text, setText } = this.props;

    return (
      <>
        <div className={s.closeButton} onClick={() => selectDialog()}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
        <>
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
        </>
      </>
    );
  }
}

export default MessagesView;
