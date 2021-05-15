import React from 'react';
import s from './BlockField.module.scss';

const BlockField = ({title, value, isRequiered}) => {
    return (
        <div className={s.field}>
            <span className={s.titleField}>
            {title}
                {isRequiered && <span className={s.isRequiered}> * </span>}
            </span>
            {value}
        </div>
    );
}

export default BlockField;
