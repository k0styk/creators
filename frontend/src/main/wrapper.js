import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import CircularProgress from '@material-ui/core/CircularProgress';
import Body from './bodyWrapper';
import s from './main.module.scss';

const Page = loadable(
    ({name}) => {
        console.log('loadable');
        switch (name) {
            case 'home': {
                return import('../components/Home');
            }
            case 'search': {
                return import('../components/Search');
            }
            case 'case': {
                return import('../components/Case');
            }
            case 'profile': {
                return import('../components/Profile');
            }
            case 'lk': {
                return import('../components/PersonalPage');
            }
            case 'chat': {
                return import('../components/Chat');
            }
            case 'create': {
                return import('../components/Create');
            }
            case 'login': {
                return import('../components/Login');
            }
            case 'register': {
                return import('../components/Register');
            }
            case 'favorites': {
                return import('../components/Favorites');
            }
            default:
                // return NOT FOUND
                return;
        }
    },
    {
        fallback: (
            <div className={s.loader}>
                <CircularProgress/>
            </div>
        ),
        cacheKey: ({name}) => name,
    }
);

const Wrapper = ({name}) => {
    if (['home', 'login', 'register'].includes(name)) {
        return <Page name={name}/>;
    }
    return (
        <Body>
            <Page name={name}/>
        </Body>
    );
};

Wrapper.propTypes = {
    name: PropTypes.string,
};

export default React.memo(Wrapper);
