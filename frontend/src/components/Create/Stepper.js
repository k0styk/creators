import React from 'react';
import {Stepper, Step, StepLabel, StepConnector} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CreateIcon from '@material-ui/icons/Create';
import {withStyles} from '@material-ui/core/styles';
import s from './Create.module.scss';
import {Link} from "react-router-dom";

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const StepperView = () => {

    const steps = [
        {
            id: 1,
            label: <span> Загрузите видео на <a href={'https://www.youtube.com/'}> www.youtube.com </a> </span>,
            icon: <BackupIcon/>
        },
        {
            id: 2,
            label: 'Скопируйте ссылку',
            icon: <FileCopyIcon/>
        },
        {
            id: 3,
            label: 'Вставьте ссылку в поле',
            icon: <CreateIcon/>
        }
    ]
    return (

        <Stepper
            className={s.stepperContainer}
            alternativeLabel
            activeStep={3}
            connector={<ColorlibConnector/>}
        >
            {
                steps.map(({id, label, icon}, index) => (
                    <Step key={id}>
                        <StepLabel StepIconComponent={() =>
                            <div className={s.step}> {icon} </div>}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    );
}

export default StepperView;
