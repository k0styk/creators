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
    };
})
class PersonalPage extends React.Component {
    render() {
        const { user } = this.props;
        const dialogs = [
            {
                caseName: 'Case1',
                caseId: 1,
                chatId: 1,
                userId: 1,
                userName: 'Pidor1',
            },
            {
                caseName: 'Case2',
                caseId: 2,
                chatId: 2,
                userId: 2,
                userName: 'Pidor2',
            },
            {
                caseName: 'Case3',
                caseId: 3,
                chatId: 3,
                userId: 3,
                userName: 'Pidor3',
            },
            {
                caseName: 'Case4',
                caseId: 4,
                chatId: 4,
                userId: 4,
                userName: 'Pidor4',
            },
            {
                caseName: 'Case5',
                caseId: 5,
                chatId: 5,
                userId: 5,
                userName: 'Pidor5',
            },
            {
                caseName: 'Case6',
                caseId: 6,
                chatId: 6,
                userId: 6,
                userName: 'Pidor6',
            },
            {
                caseName: 'Case7',
                caseId: 7,
                chatId: 7,
                userId: 7,
                userName: 'Pidor7',
            },
            {
                caseName: 'Case8',
                caseId: 8,
                chatId: 8,
                userId: 8,
                userName: 'Pidor8',
            },
            {
                caseName: 'Case9',
                caseId: 9,
                chatId: 9,
                userId: 9,
                userName: 'Pidor9',
            },
            {
                caseName: 'Case10',
                caseId: 10,
                chatId: 10,
                userId: 10,
                userName: 'Pidor10',
            },
            {
                caseName: 'Case11',
                caseId: 11,
                chatId: 11,
                userId: 11,
                userName: 'Pidor11',
            },
            {
                caseName: 'Case12',
                caseId: 12,
                chatId: 12,
                userId: 12,
                userName: 'Pidor12',
            },
            {
                caseName: 'Case13',
                caseId: 13,
                chatId: 13,
                userId: 13,
                userName: 'Pidor13',
            },
            {
                caseName: 'Case14',
                caseId: 14,
                chatId: 14,
                userId: 14,
                userName: 'Pidor14',
            },
            {
                caseName: 'Case15',
                caseId: 15,
                chatId: 15,
                userId: 15,
                userName: 'Pidor15',
            },
            {
                caseName: 'Case16',
                caseId: 16,
                chatId: 16,
                userId: 16,
                userName: 'Pidor16',
            },
            {
                caseName: 'Case17',
                caseId: 17,
                chatId: 17,
                userId: 17,
                userName: 'Pidor17',
            },
            {
                caseName: 'Case18',
                caseId: 18,
                chatId: 18,
                userId: 18,
                userName: 'Pidor18',
            },
            {
                caseName: 'Case19',
                caseId: 19,
                chatId: 19,
                userId: 19,
                userName: 'Pidor19',
            },
            {
                caseName: 'Case20',
                caseId: 20,
                chatId: 20,
                userId: 20,
                userName: 'Pidor20',
            },
        ];
        const messages = [
            { messageId: 1, message: 'message1', messageFrom: 1 },
            { messageId: 2, message: 'message2', messageFrom: 2 },
            { messageId: 3, message: 'message1', messageFrom: 1 },
            { messageId: 4, message: 'message2', messageFrom: 2 },
            { messageId: 5, message: 'message1', messageFrom: 1 },
            { messageId: 6, message: 'message2', messageFrom: 2 },
            { messageId: 7, message: 'message1', messageFrom: 1 },
            { messageId: 9, message: 'message2', messageFrom: 2 },
        ];

        return (
            <>
                <div className={s.title}>Заказ</div>
                <Divider />
                <div className={s.content}>
                    <div className={s.dialogs}>
                        <DialogsView dialogs={dialogs} />
                    </div>
                    <Divider orientation="vertical" />
                    <div className={s.messagesDialog}>
                        <div className={s.messages}>
                            <MessagesView messages={messages} />
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
                            <span className={s.titleBox}>Что включено </span>{' '}
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
                    </div>
                </div>
                <Divider />
            </>
        );
    }
}

export default PersonalPage;
