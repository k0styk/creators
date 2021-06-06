import React from 'react';
import {inject} from "mobx-react";
import s from './PersonalPage.module.scss';
import {Tooltip, IconButton, Button, Chip} from "@material-ui/core";
import TextField from "../../../shared/TextField";
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import formatPhone from '../../../tools/phoneTools';
import CasesBlock from "./CasesBlock";
import {toJS} from 'mobx';
import Dropzone from 'react-dropzone'
import PublishIcon from '@material-ui/icons/Publish';
import DoneIcon from '@material-ui/icons/Done';

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
        updateUser: PersonalPageStore.updateUser
    }
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
            updateUser
        } = this.props;

        return (
            <React.Fragment>
                <div className={s.userName}>
                    <span>
                        {`${user.secondName} ${user.firstName} ${user.lastName} `}
                    </span>
                    {
                        !isEdit && (
                            <Tooltip
                                onClick={toggleEdit}
                                placement="right" title={'Редактировать'}>
                                <IconButton
                                    size='small'
                                    color="primary">
                                    <EditIcon className={s.addIcon}/>
                                </IconButton>
                            </Tooltip>) || (
                            <Button className={s.saveButton}
                                    size='small'
                                    color="primary"
                                    onClick={updateUser}
                            >
                                <DoneIcon className={s.addIcon}/>
                                Сохранить
                            </Button>
                        )
                    }
                </div>
                <div className={s.content}>
                    <div>
                        <div className={s.avatar}>
                            {
                                isEdit && (
                                    <Dropzone onDrop={loadFiled}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                                <div className={s.loadBlock} {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Загрузить фотографию </p>
                                                    <PublishIcon/>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                )
                            }
                            {
                                user.photoPath && <img
                                    alt={user.fullName}
                                    src={user.photoPath}
                                /> || <PersonIcon className={s.noPhoto}/>
                            }
                        </div>

                        <div className={s.field}>
                            <span className={s.titleField}> Город </span>
                            <span> {user.city} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Телефон </span>
                            <span>  {user.phone && formatPhone.formatPhone(user.phone)} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Почта </span>
                            <span> {user.email} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Баланс </span>
                            <span>  28 000 руб </span>
                        </div>
                    </div>
                    <div>
                        <div className={s.userInfo}>
                            {
                                isEdit && <React.Fragment>
                                    <div>
                                        <span className={s.titleField}> Фамилия </span>
                                        <TextField
                                            onChange={({target}) => setUserField('secondName', target.value)}
                                            value={user.secondName}
                                            multiline={true}
                                        />
                                    </div>
                                    <div>
                                        <span className={s.titleField}> Имя </span>
                                        <TextField
                                            onChange={({target}) => setUserField('firstName', target.value)}
                                            value={user.firstName}
                                            multiline={true}
                                        />
                                    </div>
                                    <div>
                                        <span className={s.titleField}> Отчество </span>
                                        <TextField
                                            onChange={({target}) => setUserField('lastName', target.value)}
                                            value={user.lastName}
                                            multiline={true}
                                        />
                                    </div>
                                </React.Fragment>
                            }

                            <div>
                                <span className={s.titleField}>Деятельность </span>
                                <span>
                                    <Chip className={s.chip} label='видео' size="small"/>
                                </span>
                            </div>
                            <div>
                                <span className={s.titleField}>Сферы клиентов  </span>
                                <span>
                            {
                                spheres.map((item) =>
                                    <Chip key={item} className={s.chip} label={item} size="small"/>
                                )
                            }
                        </span>
                            </div>
                            <div>
                                <span className={s.titleField}>
                                    Количество кейсов
                                </span>
                                <span className={s.valueField}>
                             <Chip className={s.chip} size="small" label={casesCount || 'Не указано'}/>
                        </span>
                            </div>
                            <div>
                                <span className={s.titleField}>Средняя стоимость работ </span>
                                <span>
                            <Chip className={s.chip} size="small" label='28 000 руб.'/>
                        </span>
                            </div>
                            <div>
                                <span className={s.titleField}> О себе </span>
                                {
                                    !isEdit && (<span>{user.about || 'Не указано'}</span>)
                                    || (
                                        <TextField
                                            onChange={({target}) => setUserField('about', target.value)}
                                            value={user.about}
                                            multiline={true}
                                        />
                                    )
                                }
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
