import React from 'react';
import {inject} from "mobx-react";
import s from './PersonalPage.module.scss';
import {Tooltip, IconButton, Divider, Link} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Cards from "../../../shared/PromoCard/Cards";


@inject(({PersonalPageStore}) => {
    return {
        promos: PersonalPageStore.promos
    };
})
class PromosBlock extends React.Component {
    render() {
        const {promos} = this.props;

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
            <Cards promos={promos} withActions={true} withIncludes={false}/>
            <span className={s.titleWorks}>Исполненные заказы </span>
            <Divider/>
            <Cards promos={promos} withActions={true} withIncludes={false}/>
            </div>

        );
    }
}

export default PromosBlock;
