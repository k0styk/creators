import React from 'react';
import { inject } from 'mobx-react';
import s from './Chat.module.scss';
import { Divider } from '@material-ui/core';
import DialogsView from './DialogsView';
import MessagesView from './MessagesView';
import { status } from '../../enums';
import Loader from '../../shared/Loader';
import API from '../../api';

@inject(({ ChatStore, RouterStore }) => {
  return {
    isDialogSelected: ChatStore.isDialogSelected,
    chatId: ChatStore.chatId,
    RouterStore,
  };
})
class PersonalPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: status.LOADING,
    };
  }

  componentDidMount() {
    const { chatId, RouterStore } = this.props;
    if (chatId) {
      API.getMore(`chat/${chatId}`).then(({ data, otherData }) => {
        if (data.status === 301) {
          RouterStore.history.push({ pathname: data.url });
          window.location.reload();
          this.setState({
            isLoading: status.SUCCESS,
          });
        } else if (otherData.status === 200) {
          this.setState({
            isLoading: status.SUCCESS,
          });
        } else {
          this.setState({
            isLoading: status.ERROR,
          });
        }
      });
    } else {
      this.setState({
        isLoading: status.SUCCESS,
      });
    }
  }

  render() {
    const { isLoading } = this.state;
    const { isDialogSelected } = this.props;

    return (
      <>
        {isLoading === status.LOADING ? (
          <Loader />
        ) : (
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
        )}
      </>
    );
  }
}

export default PersonalPage;
