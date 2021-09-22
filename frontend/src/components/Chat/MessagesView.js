import React from 'react';
import s from './Chat.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { inject } from 'mobx-react';

import dayjs from 'dayjs';

@inject(({ ChatStore }) => {
    return {
        selectDialog: ChatStore.selectDialog,
    };
})
class MessagesView extends React.Component {
    render() {
        const { messages, user, selectDialog } = this.props;

        return (
            <>
                <div className={s.closeButton} onClick={() => selectDialog(-1)}>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </div>
                {messages.length ? (
                    <div className={s.messagesList}>
                        {messages.map((message, i) => {
                            const userClass =
                                message.messageFrom === user.id
                                    ? s.messageUser
                                    : '';

                            return typeof message === 'string' ? (
                                <div key={i} className={s.messageDateGroup}>
                                    <div className={s.messageDateGroupBlock}>
                                        {message}
                                    </div>
                                </div>
                            ) : (
                                <div key={i} className={s.message}>
                                    <div
                                        className={`${s.messageBlock} ${userClass}`}
                                    >
                                        <div className={s.messageText}>
                                            {message.message}
                                        </div>
                                        <div className={s.messageDate}>
                                            {dayjs(message.date).format(
                                                'HH:mm'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={s.emptyMessages}>Список сообщений пуст</div>
                )}
            </>
        );
    }
}

export default MessagesView;
