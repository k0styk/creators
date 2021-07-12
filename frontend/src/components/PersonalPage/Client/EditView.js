import React from 'react';
import {inject} from "mobx-react";
import s from '../PersonalPage.module.scss';
import {Button} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import DoneIcon from "@material-ui/icons/Done";
import Dropzone from "react-dropzone";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "../../../shared/TextField";

@inject(({PersonalPageStore}) => {
    return {
        user: PersonalPageStore.user,
        activeCases: PersonalPageStore.activeCases,
        completedCases: PersonalPageStore.completedCases,
        setUserField: PersonalPageStore.setUserField,
        loadFiled: PersonalPageStore.loadFiled,
    };
})
class PersonalPage extends React.Component {
    render() {
        const {
            user,
            setUserField,
            loadFiled,
            updateUser
        } = this.props;

        return (
            <React.Fragment>
                <div className={s.userName}>
                    <span>
                        {`${user?.secondName || ''} ${user?.firstName || ''} ${user?.lastName || ''} `}
                      </span>

                    <Button className={s.saveButton}
                            size='small'
                            color="primary"
                            onClick={updateUser}
                    >
                        <DoneIcon className={s.addIcon}/>
                        Сохранить
                    </Button>
                </div>
                <div className={s.content}>
                    <div>
                        <div className={s.avatar}>
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
                            {
                                user.photoPath && <img
                                    alt={user.fullName}
                                    src={user.photoPath}
                                /> || <PersonIcon className={s.noPhoto}/>
                            }
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Почта </span>
                            <span> {user.email} </span>
                        </div>
                        <div className={s.field}>
                            <span className={s.titleField}> Баланс </span>
                            <span>  {'-'} </span>
                        </div>
                    </div>

                    <div className={s.editBlock}>
                        <div className={s.userInfo}>
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

                            <div>
                                <span className={s.titleField}> Телефон </span>
                                <TextField
                                    onChange={({target}) => setUserField('phone', target.value)}
                                    value={user.firstName}
                                    multiline={true}
                                />
                            </div>

                            <div>
                                <span className={s.titleField}> Город </span>
                                <TextField
                                    onChange={({target}) => setUserField('phone', target.value)}
                                    value={user.firstName}
                                    multiline={true}
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
