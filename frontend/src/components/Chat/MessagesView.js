import React from 'react';
import s from './Chat.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { Button, IconButton, TextField } from '@material-ui/core';
import { inject } from 'mobx-react';

import dayjs from 'dayjs';

import Loader from '../../shared/Loader';

import { chatEnum } from '../../enums';

@inject(({ ChatStore, UserStore }) => {
  return {
    text: ChatStore.text,
    setText: ChatStore.setText,
    selectDialog: ChatStore.selectDialog,
    sendMessage: ChatStore.sendMessage,
    messages: ChatStore.messages,
    loadMessagesStatus: ChatStore.loadMessagesStatus,
    user: UserStore.user,
  };
})
class MessagesView extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const { text, sendMessage, setText } = this.props;
    sendMessage(text);
    setText({ target: { value: '' } });
  }

  render() {
    const { loadMessagesStatus, messages, user, selectDialog, text, setText } =
      this.props;

    console.log(messages);

    return (
      <>
        <div className={s.closeButton} onClick={() => selectDialog()}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
        <>
          {loadMessagesStatus === chatEnum.IS_CHECKING ? (
            <Loader />
          ) : messages.length ? (
            <div className={s.messagesList}>
              {messages.map((message, i) => {
                const userClass =
                  message.fromId === user.id ? s.messageUser : '';

                return typeof message === 'string' ? (
                  <div key={i} className={s.messageDateGroup}>
                    <div className={s.messageDateGroupBlock}>{message}</div>
                  </div>
                ) : (
                  <div key={i} className={s.message}>
                    <div className={`${s.messageBlock} ${userClass}`}>
                      <div className={s.messageText}>{message.text}</div>
                      <div className={s.messageDate}>
                        {dayjs(message.dateSend).format('HH:mm')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={s.emptyMessages}>Список сообщений пуст</div>
          )}

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
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={this.handleSubmit.bind(this)}
              >
                отправить
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
