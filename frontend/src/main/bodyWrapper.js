import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './main.module.scss';
import Header from '../components/Header';
import Footer from '../shared/Footer';
import {inject} from "mobx-react";

@inject(({UserStore}) => {
    return {
        userType: UserStore.user?.type,
    };
})
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = { alerts: []};
    }

    render() {
    const {children,userType} = this.props;

    return (
      <div className={s.wrapper}>
          <Header userType={userType}/>
        <div className={s.content}>
          {children}
        </div>
        <Footer/>
      </div>
    );
  }
}

Body.propTypes = {
  children: PropTypes.any,
};

export default Body;
