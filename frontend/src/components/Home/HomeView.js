import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Recommendations from './Recommendations';
import s from './Home.module.scss';
import Index from '../../shared/Footer';

const Home = () => (
    <div className={s.wrapper}>
        <Header />
        <div className={s.contentContainer}>
            <Filter />
            <Recommendations/>
        </div>
        <Index/>
    </div>
);

export default Home;
