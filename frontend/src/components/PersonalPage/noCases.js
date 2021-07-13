import React from 'react';
import s from './PersonalPage.module.scss';

const NoCasesView = ({text}) => {
        return (
            <React.Fragment>
                <div className={s.noCases}>
                    {text}
                </div>
            </React.Fragment>
        );
}

export default NoCasesView;
