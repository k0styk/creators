import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './main.module.scss';
import Header from './Header';
import Footer from '../shared/Footer';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = { alerts: []};
    }

    render() {
    const {children} = this.props;

    return (
      <div className={s.wrapper}>
          <Header/>
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
