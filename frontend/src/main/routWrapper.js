import React, {Component} from 'react';
import {inject} from "mobx-react";
import Wrapper from './wrapper';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {authStatusEnum} from '../enums';
import s from "./main.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

@inject(({RouterStore, UserStore}) => {
    return {
        authStatus: UserStore.authStatus,
        RouterStore
    };
})
class StoreWrapper extends Component {
    constructor(props) {
        super(props);

        this.updateStore();
    }

    componentDidUpdate() {
        this.updateStore();
    }

    updateStore = () => {
        const {RouterStore,} = this.props;

        RouterStore.setRoute(
            this.props.location,
            this.props.match,
            this.props.history
        );
    };

    render() {
        const {name, authStatus, RouterStore} = this.props;
        if (authStatus === authStatusEnum.IS_CHECKING) {
            return (
                <div className={s.loader}>
                    <CircularProgress/>
                </div>
            )
        }
        if (authStatus === authStatusEnum.IS_AUTHENTICARED && RouterStore.authRoutes.includes(name)) {
            return <Redirect to='/'/>;
        }
        if (authStatus === authStatusEnum.AUTH_IS_FAILED && RouterStore.privateRoutes.includes(name)) {
            return <Redirect to='/login'/>;
        }
        return (
            <Wrapper name={name}/>
        );
    }
}

StoreWrapper.propTypes = {
    RouterStore: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    name: PropTypes.string
};

export default StoreWrapper;
