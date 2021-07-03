import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import s from './Tooltip.module.scss';
import {
    CardActionArea,
    Card,
    CardContent,
    CardMedia,
    Popover,
    IconButton
} from '@material-ui/core';

export default function CheckboxList({text, tooltipAdditional, tooltipAdditionalType}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const image = tooltipAdditionalType === 'iframe' ? `https://www.youtube.com/embed/${tooltipAdditional}` : tooltipAdditional;

    console.log(tooltipAdditional, tooltipAdditionalType);
    return (
        <React.Fragment>
            <IconButton edge="end" onClick={handleClick}>
                <HelpIcon className={s.helpIcon}/>
            </IconButton>
            <Popover
                onClose={handleClick}
                open={!!anchorEl}
                anchorEl={anchorEl}
            >
                <Card className={s.popper}>
                    <CardActionArea>
                        {
                            tooltipAdditional && tooltipAdditional && <CardMedia
                                className={s.media}
                                image={image}
                                component={tooltipAdditionalType}
                                title="Contemplative Reptile"
                            />
                        }
                        <CardContent className={s.content}>
                            {(text || '').split('\n').map((item) => <span>{item.replace(/\\n/g, '')}</span>)}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Popover>
        </React.Fragment>
    );
}
