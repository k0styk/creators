import React from 'react';
import { inject } from 'mobx-react';
import s from '../PersonalPage.module.scss';
import {
  Tooltip,
  IconButton,
  Divider,
  Button,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import CaseCard from '../../../shared/CaseCard';
import PersonIcon from '@material-ui/icons/Person';
import NoCasesView from '../noCases';
import formatPhone from '../../../tools/phoneTools';
import EditIcon from '@material-ui/icons/Edit';

@inject(({ PersonalPageStore, RouterStore }) => {
  return {
    price: PersonalPageStore.price,
    user: PersonalPageStore.user,
    activeCases: PersonalPageStore.activeCases,
    completedCases: PersonalPageStore.completedCases,
    toggleEdit: PersonalPageStore.toggleEdit,
    RouterStore,
  };
})
class PersonalPage extends React.Component {
  constructor(props) {
    super(props);

    this.defaultMailMessage = `У вас не подтверждена почта, отправить письмо активации повторно?`;
    this.state = {
      mailMessage: this.defaultMailMessage,
      isSend: false,
    };
  }

  sendActivationLink = () => {
    // TODO: api for resend activation link
    if (!this.state.isSend) {
      this.setState(
        {
          mailMessage: 'Письмо отправлено, следуйте инструкциям в письме',
          isSend: true,
        },
        () =>
          setTimeout(
            () =>
              this.setState({
                mailMessage: this.defaultMailMessage,
                isSend: false,
              }),
            30000
          )
      );
    }
  };

  goToSearch = () => {
    this.props.RouterStore.history.push({
      pathname: '/search',
    });
  };

  render() {
    const { user, toggleEdit, completedCases, activeCases } = this.props;
    let fullName = `${user?.secondName || ''} ${user?.firstName || ''} ${
      user?.lastName || ''
    }`;
    if (!fullName.trim().length) {
      fullName = 'Заполните данные о себе';
    }
    return (
      <React.Fragment>
        <div className={s.userName}>
          <span>{fullName}</span>
          <Button
            onClick={toggleEdit}
            placement="right"
            title={'Редактировать'}
            startIcon={<EditIcon className={s.addIcon} />}
          >
            Редактировать информацию
          </Button>
        </div>
        <div className={s.content}>
          <div className={s.userBlock}>
            <div className={s.avatar}>
              {(user.photoPath && (
                <img alt={user.fullName} src={user.photoPath} />
              )) || <PersonIcon className={s.noPhoto} />}
            </div>
            <div className={s.field}>
              <span className={s.titleField}> Город </span>
              <span> {user.city?.name} </span>
            </div>
            <div className={s.field}>
              <span className={s.titleField}> Телефон </span>
              <span> {user.phone && formatPhone.formatPhone(user.phone)} </span>
            </div>
            <div className={s.field}>
              <div className={s.titleField}> Почта </div>
              <div className={s.titleFieldMail}>
                <div>{user.email}</div>
                <div
                  className={s.titleFieldIcon}
                  style={{
                    color: user && user.isActivated ? 'green' : 'red',
                  }}
                >
                  {user && user.isActivated ? (
                    <CheckIcon />
                  ) : (
                    <Tooltip
                      arrow
                      interactive
                      leaveDelay={500}
                      title={
                        <React.Fragment>
                          <Typography
                            style={{
                              cursor: this.state.isSend ? 'default' : 'pointer',
                            }}
                            onClick={() => this.sendActivationLink()}
                          >
                            {this.state.mailMessage}
                          </Typography>
                        </React.Fragment>
                      }
                    >
                      <ClearIcon />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            <div className={s.field}>
              <span className={s.titleField}> Баланс </span>
              <span> {'-'} </span>
            </div>
          </div>

          <div className={s.works}>
            {user && !user.isFullRegister ? (
              <div className={s.isFullRegister}>
                Вам необходимо заполнить информацию о себе
              </div>
            ) : null}
            {user && !user.isActivated ? (
              <div className={s.isActivated}>
                Вам необходимо подтвердить адрес электронной почты
              </div>
            ) : null}
            {user && !(user.isFullRegister && user.isActivated) ? (
              <div className={s.additionalInfo}>
                Для создания заказов, вам необходимо завершить регистрацию,
                заполнив все поля и подтвердить адрес электронной почты
              </div>
            ) : null}
            <span className={s.titleWorks}>
              Активные заказы
              <Tooltip placement="right" title={'Сделать заказ'}>
                <span>
                  <IconButton
                    size="small"
                    color="primary"
                    disabled={!(user.isFullRegister && user.isActivated)}
                    onClick={this.goToSearch}
                    style={
                      !(user.isFullRegister && user.isActivated)
                        ? { pointerEvents: 'none' }
                        : {}
                    }
                  >
                    <AddIcon className={s.addIcon} />
                  </IconButton>
                </span>
              </Tooltip>
            </span>
            <Divider />
            {(activeCases.length && <CaseCard cases={activeCases} />) || (
              <NoCasesView text={'У вас нет активных заказов :('} />
            )}
            <span className={s.titleWorks}>Выполненные заказы</span>
            <Divider />
            {(completedCases.length && <CaseCard cases={completedCases} />) || (
              <NoCasesView text={'У вас нет выполненных заказов :('} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PersonalPage;
