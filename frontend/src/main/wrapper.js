import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import CircularProgress from '@material-ui/core/CircularProgress';
import Body from './bodyWrapper';

const Page = loadable(
    ({name}) => {
        switch (name) {
            case 'home': {
                return import('../components/Home');
            }
            case 'search': {
                return import('../components/Search');
            }
            case 'promo': {
                return import('../components/Promo');
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
            default:
                return;
        }
    }, {
        fallback: (<CircularProgress/>),
        cacheKey: ({name}) => name,
    },
);

const Wrapper = ({name}) => {
    if (name === 'home') {
        return <Page name={name}/>;
    }
    return <Body> <Page name={name}/> </Body>;
};

Wrapper.propTypes = {
    name: PropTypes.string,
};

export default React.memo(Wrapper);
