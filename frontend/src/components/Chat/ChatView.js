import React from 'react';
import { inject } from 'mobx-react';
import s from './Chat.module.scss';
import { Divider } from '@material-ui/core';
import DialogsView from './DialogsView';
import MessagesView from './MessagesView';

@inject(({ ChatStore }) => {
  return {
    isDialogSelected: ChatStore.isDialogSelected,
  };
})
class PersonalPage extends React.Component {
  render() {
    const { isDialogSelected } = this.props;

    return (
      <>
        <div className={s.title}>Заказ</div>
        <div className={s.content}>
          <div className={s.dialogs}>
            <DialogsView />
          </div>
          <Divider orientation="vertical" />
          <div className={s.messagesDialog}>
            {isDialogSelected ? (
              <MessagesView />
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
