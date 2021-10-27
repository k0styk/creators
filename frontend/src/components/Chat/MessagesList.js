import React from 'react';
import s from './Chat.module.scss';
import { inject } from 'mobx-react';
import { toJS } from 'mobx';

import dayjs from 'dayjs';

@inject(({ ChatStore, UserStore }) => {
  return {
    messages: toJS(ChatStore.messages),
    user: UserStore.user,
  };
})
class MessagesList extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    const { messages, user } = this.props;

    return (
      <>
        {messages.length ? (
          <div className={s.messageListBlock}>
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
              <div
                style={{ float: 'left', clear: 'both' }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className={s.emptyMessages}>Список сообщений пуст</div>
        )}
      </>
    );
  }
}

export default MessagesList;
