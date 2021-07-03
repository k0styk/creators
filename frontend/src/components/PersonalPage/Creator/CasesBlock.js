import React from 'react';
import {inject} from "mobx-react";
import s from './PersonalPage.module.scss';
import {Tooltip, IconButton, Divider, Link} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Cards from "../../../shared/CaseCard";


@inject(({PersonalPageStore}) => {
    return {
        cases: PersonalPageStore.cases,
        user: PersonalPageStore.user
    };
})
class CasesBlock extends React.Component {
    render() {
        const {cases, user} = this.props;

        return (
            <div className={s.works}>
            <span className={s.titleWorks}> Ваши кейсы
              <Link href={'create'}>
                   <Tooltip placement="right" title={'Создать кейс'}>
                    <IconButton size='small' color="primary">
                    <AddIcon className={s.addIcon}/>
                </IconButton>
                </Tooltip>
              </Link>
            </span>
            <Divider/>
            <Cards
                cases={cases}
                withActions={true}
                user={user}
                withIncludes={false}
            />
            <span className={s.titleWorks}>
                Исполненные заказы
            </span>
            <Divider/>
            <Cards
                user ={user}
                cases={cases}
                withActions={true}
                withIncludes={false}
            />
            </div>

        );
    }
}

export default CasesBlock;
