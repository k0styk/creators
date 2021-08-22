import React from 'react';
import {inject} from 'mobx-react';
import s from '../PersonalPage.module.scss';
import {Tooltip, IconButton, Divider, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CaseCard from '../../../shared/CaseCard';
import PersonIcon from '@material-ui/icons/Person';
import NoCasesView from '../noCases';
import formatPhone from '../../../tools/phoneTools';
import EditIcon from '@material-ui/icons/Edit';

@inject(({PersonalPageStore, RouterStore}) => {
    return {
        price: PersonalPageStore.price,
        user: PersonalPageStore.user,
        activeCases: PersonalPageStore.activeCases,
        completedCases: PersonalPageStore.completedCases,
        toggleEdit: PersonalPageStore.toggleEdit,
        RouterStore
    };
})

class PersonalPage extends React.Component {

    goToSearch = () => {
        this.props.RouterStore.history.push({
            pathname: '/search'
        });
    }

    render() {
        const {user, toggleEdit, completedCases, activeCases} = this.props;
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
                        startIcon={<EditIcon className={s.addIcon}/>}
                    >
                        Редактировать информацию
                    </Button>
                </div>
                <div className={s.content}>
                    <div className={s.userBlock}>
                        <div className={s.avatar}>
                            {(user.photoPath && (
                                <img alt={user.fullName} src={user.photoPath}/>
                            )) || <PersonIcon className={s.noPhoto}/>}
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Город </span>
                            <span> {user.city?.name} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Телефон </span>
                            <span>
                                {' '}
                                {user.phone &&
                                formatPhone.formatPhone(user.phone)}{' '}
                            </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Почта </span>
                            <span> {user.email} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Баланс </span>
                            <span> {'-'} </span>
                        </div>
                    </div>

                    <div className={s.works}>
                        <span className={s.titleWorks}>
                            Активные заказы
                            <Tooltip placement="right" title={'Сделать заказ'} onClick={this.goToSearch}>
                                <IconButton size="small" color="primary">
                                    <AddIcon className={s.addIcon}/>
                                </IconButton>
                            </Tooltip>
                        </span>
                        <Divider/>
                        {(activeCases.length && (
                            <CaseCard cases={activeCases}/>
                        )) || (
                            <NoCasesView
                                text={'У вас нет активных заказов :('}
                            />
                        )}
                        <span className={s.titleWorks}>Выполненные заказы</span>
                        <Divider/>
                        {(completedCases.length && (
                            <CaseCard cases={completedCases}/>
                        )) || (
                            <NoCasesView
                                text={'У вас нет выполненных заказов :('}
                            />
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PersonalPage;
