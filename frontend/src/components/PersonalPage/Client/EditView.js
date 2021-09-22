import React from 'react';
import {inject} from 'mobx-react';
import {toJS} from 'mobx';
import s from '../PersonalPage.module.scss';
import {Button} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DoneIcon from '@material-ui/icons/Done';
import Dropzone from 'react-dropzone';
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '../../../shared/TextField';
import SelectAddress from '../../../shared/AddressSelect';

@inject(({PersonalPageStore}) => {
    return {
        user: toJS(PersonalPageStore.user),
        activeCases: PersonalPageStore.activeCases,
        completedCases: PersonalPageStore.completedCases,
        setUserField: PersonalPageStore.setUserField,
        loadFiled: PersonalPageStore.loadFiled,
        updateUser: PersonalPageStore.updateUser,
    };
})
class PersonalPage extends React.Component {
    render() {
        const {user, setUserField, loadFiled, updateUser} = this.props;
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
                        className={s.saveButton}
                        size="small"
                        color="primary"
                        onClick={updateUser}
                    >
                        <DoneIcon className={s.addIcon}/>
                        Сохранить
                    </Button>
                </div>
                <div className={s.content}>
                    <div className={s.userBlock}>
                        <div className={s.avatar}>
                            {user.photoPath ? (
                                <img alt={user.fullName} src={user.photoPath}/>
                            ) : (
                                <PersonIcon className={s.noPhoto}/>
                            )}
                            <Dropzone onDrop={loadFiled}>
                                {({getRootProps, getInputProps}) => (
                                    <React.Fragment>
                                        <Button
                                            color="primary"
                                            startIcon={<PublishIcon/>}
                                            variant="contained"
                                            className={s.upButton}
                                            {...getRootProps()}>
                                            Загрузить фотографию
                                            <input {...getInputProps()} />
                                        </Button>
                                    </React.Fragment>
                                )}
                            </Dropzone>
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

                    <div className={s.editBlock}>
                        <div className={s.userInfo}>
                            <div>
                                <span className={s.titleField}> Фамилия </span>
                                <TextField
                                    placeholder={'Введите фамилию'}
                                    onChange={({target}) =>
                                        setUserField('secondName', target.value)
                                    }
                                    value={user.secondName}
                                    multiline={true}
                                />
                            </div>
                            <div>
                                <span className={s.titleField}> Имя </span>
                                <TextField
                                    placeholder={'Введите имя'}
                                    onChange={({target}) =>
                                        setUserField('firstName', target.value)
                                    }
                                    value={user.firstName}
                                    multiline={true}
                                />
                            </div>
                            <div>
                                <span className={s.titleField}> Отчество </span>
                                <TextField
                                    placeholder={'Введите отчество'}
                                    onChange={({target}) =>
                                        setUserField('lastName', target.value)
                                    }
                                    value={user.lastName}
                                    multiline={true}
                                />
                            </div>

                            <div>
                                <span className={s.titleField}> Телефон </span>
                                <TextField
                                    placeholder={'Введите номер'}
                                    onChange={({target}) =>
                                        setUserField('phone', target.value)
                                    }
                                    value={user.phone}
                                    multiline={true}
                                />
                            </div>
                            <div>
                                <span className={s.titleField}> Город </span>
                                <SelectAddress
                                    withNull={false}
                                    city={user.city}
                                    onChangeCity={(val) =>
                                        setUserField('city', val)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PersonalPage;
