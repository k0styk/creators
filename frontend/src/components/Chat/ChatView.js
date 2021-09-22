import React from 'react';
import { inject } from 'mobx-react';
import s from './Chat.module.scss';
import { Divider, Avatar, Button } from '@material-ui/core';
import CheckboxList from './CheckboxList';
import DialogsView from './DialogsView';
import MessagesView from './MessagesView';

@inject(({ ChatStore, UserStore }) => {
    return {
        price: ChatStore.price,
        user: UserStore.user,
        isDialogSelected: ChatStore.isDialogSelected,
    };
})
class PersonalPage extends React.Component {
    render() {
        const { user, isDialogSelected } = this.props;
        const dialogs = [
            {
                caseName: 'Case Name 1',
                caseId: 1,
                chatId: 1,
                userId: 1,
                userName: 'User Name 1',
            },
            {
                caseName: 'Case Name 2',
                caseId: 2,
                chatId: 2,
                userId: 2,
                userName: 'User Name 2',
            },
            {
                caseName: 'Case Name 3',
                caseId: 3,
                chatId: 3,
                userId: 3,
                userName: 'User Name 3',
            },
            {
                caseName: 'Case Name 4',
                caseId: 4,
                chatId: 4,
                userId: 4,
                userName: 'User Name 4',
            },
            {
                caseName: 'Case Name 5',
                caseId: 5,
                chatId: 5,
                userId: 5,
                userName: 'User Name 5',
            },
            {
                caseName: 'Case Name 6',
                caseId: 6,
                chatId: 6,
                userId: 6,
                userName: 'User Name 6',
            },
            {
                caseName: 'Case Name 7',
                caseId: 7,
                chatId: 7,
                userId: 7,
                userName: 'User Name 7',
            },
            {
                caseName: 'Case Name 8',
                caseId: 8,
                chatId: 8,
                userId: 8,
                userName: 'User Name 8',
            },
            {
                caseName: 'Case Name 9',
                caseId: 9,
                chatId: 9,
                userId: 9,
                userName: 'User Name 9',
            },
            {
                caseName: 'Case Name 10',
                caseId: 10,
                chatId: 10,
                userId: 10,
                userName: 'User Name 10',
            },
            {
                caseName: 'Case Name 11',
                caseId: 11,
                chatId: 11,
                userId: 11,
                userName: 'User Name 11',
            },
            {
                caseName: 'Case Name 12',
                caseId: 12,
                chatId: 12,
                userId: 12,
                userName: 'User Name 12',
            },
            {
                caseName: 'Case Name 13',
                caseId: 13,
                chatId: 13,
                userId: 13,
                userName: 'User Name 13',
            },
            {
                caseName: 'Case Name 14',
                caseId: 14,
                chatId: 14,
                userId: 14,
                userName: 'User Name 14',
            },
            {
                caseName: 'Case Name 15',
                caseId: 15,
                chatId: 15,
                userId: 15,
                userName: 'User Name 15',
            },
            {
                caseName: 'Case Name 16',
                caseId: 16,
                chatId: 16,
                userId: 16,
                userName: 'User Name 16',
            },
            {
                caseName: 'Case Name 17',
                caseId: 17,
                chatId: 17,
                userId: 17,
                userName: 'User Name 17',
            },
            {
                caseName: 'Case Name 18',
                caseId: 18,
                chatId: 18,
                userId: 18,
                userName: 'User Name 18',
            },
            {
                caseName: 'Case Name 19',
                caseId: 19,
                chatId: 19,
                userId: 19,
                userName: 'User Name 19',
            },
            {
                caseName: 'Case Name 20',
                caseId: 20,
                chatId: 20,
                userId: 20,
                userName: 'User Name 20',
            },
        ];
        const messages = [
            '02.08.21',
            {
                messageId: 1,
                message:
                    'message1 message1 message1 message1 message1 message1 message1 message1 message1',
                messageFrom: 1,
                date: new Date('02.08.21 13:00'),
            },
            {
                messageId: 2,
                message:
                    'message1 message1 message1 message1 message1 message1 message1 message1 message1',
                messageFrom: 2,
                date: new Date('02.08.21 13:01'),
            },
            {
                messageId: 3,
                message: 'message1',
                messageFrom: 1,
                date: new Date('02.08.21 13:02'),
            },
            {
                messageId: 4,
                message: 'message2',
                messageFrom: 2,
                date: new Date('02.08.21 13:03'),
            },
            '03.08.21',
            {
                messageId: 5,
                message: 'message1',
                messageFrom: 1,
                date: new Date('03.08.21 13:00'),
            },
            {
                messageId: 6,
                message: 'message2',
                messageFrom: 2,
                date: new Date('03.08.21 13:01'),
            },
            {
                messageId: 7,
                message: 'message1',
                messageFrom: 1,
                date: new Date('03.08.21 13:02'),
            },
            {
                messageId: 9,
                message: 'message2',
                messageFrom: 2,
                date: new Date('03.08.21 13:03'),
            },
            '04.08.21',
            {
                messageId: 10,
                message: 'message1',
                messageFrom: 1,
                date: new Date('04.08.21 13:00'),
            },
            {
                messageId: 11,
                message: 'message2',
                messageFrom: 2,
                date: new Date('04.08.21 13:01'),
            },
            {
                messageId: 12,
                message: 'message1',
                messageFrom: 1,
                date: new Date('04.08.21 13:02'),
            },
            {
                messageId: 13,
                message: 'message2',
                messageFrom: 2,
                date: new Date('04.08.21 13:03'),
            },
            '05.08.21',
            {
                messageId: 14,
                message: 'message1',
                messageFrom: 1,
                date: new Date('05.08.21 13:00'),
            },
            {
                messageId: 15,
                message: 'message2',
                messageFrom: 2,
                date: new Date('05.08.21 13:01'),
            },
            {
                messageId: 16,
                message: 'message1',
                messageFrom: 1,
                date: new Date('05.08.21 13:02'),
            },
            {
                messageId: 17,
                message: 'message2',
                messageFrom: 2,
                date: new Date('05.08.21 13:03'),
            },
            '06.08.21',
            {
                messageId: 18,
                message: 'message1',
                messageFrom: 1,
                date: new Date('06.08.21 13:00'),
            },
            {
                messageId: 19,
                message: 'message2',
                messageFrom: 2,
                date: new Date('06.08.21 13:01'),
            },
            {
                messageId: 20,
                message: 'message1',
                messageFrom: 1,
                date: new Date('06.08.21 13:02'),
            },
            {
                messageId: 21,
                message: 'message2',
                messageFrom: 2,
                date: new Date('06.08.21 13:03'),
            },
            '07.08.21',
            {
                messageId: 22,
                message: 'message1',
                messageFrom: 1,
                date: new Date('06.08.21 13:00'),
            },
            {
                messageId: 23,
                message: 'message2',
                messageFrom: 2,
                date: new Date('06.08.21 13:01'),
            },
            {
                messageId: 24,
                message: 'message1',
                messageFrom: 1,
                date: new Date('06.08.21 13:02'),
            },
            {
                messageId: 25,
                message: 'message2',
                messageFrom: 2,
                date: new Date('06.08.21 13:03'),
            },
        ];

        return (
            <>
                <div className={s.title}>Заказ</div>
                <div className={s.content}>
                    <div className={s.dialogs}>
                        <DialogsView dialogs={dialogs} />
                    </div>
                    <Divider orientation="vertical" />
                    <div className={s.messagesDialog}>
                        {isDialogSelected ? (
                            <>
                                <div className={s.messages}>
                                    <MessagesView
                                        user={user}
                                        messages={messages}
                                    />
                                </div>
                                <Divider orientation="vertical" />
                                <div className={s.details}>
                                    <div className={s.header}>
                                        <div>
                                            <span className={s.price}>
                                                {' '}
                                                Стоимость: 4 руб.{' '}
                                            </span>
                                            <span className={s.dates}>
                                                {' '}
                                                Срок изготовления: 14 дней{' '}
                                            </span>
                                        </div>
                                        <div className={s.user}>
                                            Cindy Baker
                                            <Avatar
                                                alt="Cindy Baker"
                                                src="https://sun9-37.userapi.com/impg/DtbybJ1pculLMHN29oXM-HzAazNyjJ8hzNS7sw/p5wakIgVpaY.jpg?size=1350x1800&quality=96&sign=db049c6407e81ce1fe9c4f68f81a2f53&type=album"
                                            />
                                        </div>
                                    </div>
                                    <span className={s.titleBox}>
                                        Что включено{' '}
                                    </span>{' '}
                                    <CheckboxList />
                                    <Button
                                        variant="contained"
                                        size={'small'}
                                        color={'primary'}
                                        className={s.buttonLink}
                                    >
                                        {' '}
                                        Оплатить{' '}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className={s.nonSelectedDialog}>
                                Выберите диалог чтобы начать общение
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default PersonalPage;
