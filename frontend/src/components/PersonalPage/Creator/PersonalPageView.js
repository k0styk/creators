import React from 'react';
import {inject} from 'mobx-react';
import s from '../PersonalPage.module.scss';
import {Button, Chip} from '@material-ui/core';
import TextField from '../../../shared/TextField';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import formatPhone from '../../../tools/phoneTools';
import CasesBlock from './CasesBlock';
import {toJS} from 'mobx';
import Dropzone from 'react-dropzone';
import PublishIcon from '@material-ui/icons/Publish';
import DoneIcon from '@material-ui/icons/Done';
import SelectAddress from '../../../shared/AddressSelect';
import FormatPrice from "../../../tools/formatPrice";

@inject(({PersonalPageStore}) => {
    return {
        user: toJS(PersonalPageStore.user),
        spheres: PersonalPageStore.spheres,
        casesCount: PersonalPageStore.casesCount,
        cases: PersonalPageStore.cases,
        isEdit: PersonalPageStore.isEdit,
        toggleEdit: PersonalPageStore.toggleEdit,
        setUserField: PersonalPageStore.setUserField,
        loadFiled: PersonalPageStore.loadFiled,
        updateUser: PersonalPageStore.updateUser,
        sumPrice: PersonalPageStore.sumPrice
    };
})
class PersonalPage extends React.Component {
    render() {
        const {
            user,
            spheres,
            casesCount,
            isEdit,
            toggleEdit,
            setUserField,
            loadFiled,
            updateUser,
            sumPrice
        } = this.props;
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
                    {!isEdit ? (
                        <Button
                            onClick={toggleEdit}
                            placement="right"
                            title={'Редактировать'}
                            startIcon={<EditIcon className={s.addIcon}/>}
                        >
                            Редактировать информацию
                        </Button>
                    ) : (
                        <Button
                            className={s.saveButton}
                            size="small"
                            color="primary"
                            onClick={updateUser}
                        >
                            <DoneIcon className={s.addIcon}/>
                            Сохранить
                        </Button>
                    )}
                </div>
                <div className={s.content}>
                    <div className={s.userBlock}>
                        <div className={s.avatar}>
                            {(user.photoPath && (
                                <img alt={user.fullName} src={user.photoPath}/>
                            )) || <PersonIcon className={s.noPhoto}/>}
                            {isEdit && (
                                <Dropzone onDrop={loadFiled}>
                                    {({getRootProps, getInputProps}) => (
                                        <React.Fragment>
                                            <Button
                                                startIcon={<PublishIcon/>}
                                                color="primary"
                                                variant="contained"
                                                className={s.upButton}
                                                {...getRootProps()}>
                                                Загрузить фотографию
                                                <input {...getInputProps()} />
                                            </Button>
                                        </React.Fragment>
                                    )}
                                </Dropzone>
                            )}
                        </div>

                        {!isEdit && (
                            <React.Fragment>
                                <div className={s.field}>
                                    <span className={s.titleField}>
                                        {' '}
                                        Город{' '}
                                    </span>
                                    <span> {user.city?.name} </span>
                                </div>
                                <div className={s.field}>
                                    <span className={s.titleField}>
                                        {' '}
                                        Телефон{' '}
                                    </span>
                                    <span>
                                        {' '}
                                        {user.phone &&
                                        formatPhone.formatPhone(
                                            user.phone
                                        )}{' '}
                                    </span>
                                </div>
                            </React.Fragment>
                        )}
                        <div className={s.field}>
                            <span className={s.titleField}> Почта </span>
                            <span> {user.email} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Баланс </span>
                            <span> {'-'} </span>
                        </div>
                    </div>
                    <div className={s.fullBlock}>
                        <div className={s.userInfo}>
                            {isEdit && (
                                <React.Fragment>
                                    <div>
                                        <span className={s.titleField}>
                                            {' '}
                                            Фамилия{' '}
                                        </span>
                                        <TextField
                                            onChange={({target}) =>
                                                setUserField(
                                                    'secondName',
                                                    target.value
                                                )
                                            }
                                            value={user.secondName}
                                            multiline={true}
                                        />
                                    </div>
                                    <div>
                                        <span className={s.titleField}>
                                            {' '}
                                            Имя{' '}
                                        </span>
                                        <TextField
                                            onChange={({target}) =>
                                                setUserField(
                                                    'firstName',
                                                    target.value
                                                )
                                            }
                                            value={user.firstName}
                                            multiline={true}
                                        />
                                    </div>
                                    <div>
                                        <span className={s.titleField}>
                                            {' '}
                                            Отчество{' '}
                                        </span>
                                        <TextField
                                            onChange={({target}) =>
                                                setUserField(
                                                    'lastName',
                                                    target.value
                                                )
                                            }
                                            value={user.lastName}
                                            multiline={true}
                                        />
                                    </div>
                                    <div>
                                        <span className={s.titleField}>
                                            {' '}
                                            Телефон{' '}
                                        </span>
                                        <TextField
                                            placeholder={'Введите номер'}
                                            onChange={({target}) =>
                                                setUserField(
                                                    'phone',
                                                    target.value
                                                )
                                            }
                                            value={user.phone}
                                            multiline={true}
                                        />
                                    </div>
                                    <div>
                                        <span className={s.titleField}>
                                            {' '}
                                            Город{' '}
                                        </span>
                                        <SelectAddress
                                            withNull={false}
                                            city={user.city}
                                            onChangeCity={(val) =>
                                                setUserField('city', val)
                                            }
                                        />
                                    </div>
                                </React.Fragment>
                            )}
                            <div>
                                <span className={s.titleField}>
                                    Деятельность{' '}
                                </span>
                                <span>
                                    <Chip
                                        className={s.chip}
                                        label="видео"
                                        size="small"
                                    />
                                </span>
                            </div>
                            <div>
                                <span className={s.titleField}>
                                    Сферы клиентов{' '}
                                </span>
                                <span>
                                    {spheres.map((item) => (
                                        <Chip
                                            key={item}
                                            className={s.chip}
                                            label={item}
                                            size="small"
                                        />
                                    ))}
                                </span>
                            </div>
                            <div>
                                <span className={s.titleField}>
                                    Количество кейсов
                                </span>
                                <span className={s.valueField}>
                                    <Chip
                                        className={s.chip}
                                        size="small"
                                        label={casesCount || 'Не указано'}
                                    />
                                </span>
                            </div>
                            <div>
                                {
                                    sumPrice && (
                                        <React.Fragment>
                                            <span className={s.titleField}>
                                                Средняя стоимость работ{' '}
                                            </span>
                                            <span>
                                                <Chip
                                                    className={s.chip}
                                                    size="small"
                                                    label={FormatPrice(sumPrice)}
                                                />
                                            </span>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                            <div>
                                <span className={s.titleField}> О себе </span>
                                {(!isEdit && (
                                    <span>{user.about || 'Не указано'}</span>
                                )) || (
                                    <TextField
                                        variant={'outlined'}
                                        onChange={({target}) =>
                                            setUserField('about', target.value)
                                        }
                                        value={user.about}
                                        multiline={true}
                                    />
                                )}
                            </div>
                        </div>
                        <CasesBlock/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PersonalPage;
