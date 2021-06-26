import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 1000,
    },
    slider: {
        markLabelActive: {
            width: '200px'
        },
    },
}));


function valuetext(valuetext) {
    if (!valuetext) {
        return `30 м`;
    }
    const value = valuetext * 10;
    if (value < 60) {
        return `${value} м`;
    }
    let hours = Math.trunc(value / 60);
    const minutes = value - (hours * 60);

    if (hours < 24) {
        return `${hours} ч ${minutes} м`;
    }

    const days = Math.trunc(hours / 24);
    hours = hours - (days * 24);
    return `${days}д ${hours}ч ${minutes}м`;
}

function ValueLabelComponent(props) {
    const {children, open, value} = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const marks = [
    {
        value: 6,
        label: '1ч'
    },
    {
        value: 30,
        label: '5ч'
    },
    {
        value: 144,
        label: '1д'
    },
    {
        value: 720,
        label: '5д'
    },
];


export default function DiscreteSlider() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>
                1 дн
            </Typography>
            <Slider
                marks={marks}
                className={classes.slider}
                valueLabelFormat={valuetext}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="of"
                max={2160}
                min={3}
                step={3}
                ValueLabelComponent={ValueLabelComponent}
            />
        </div>
    );
}
