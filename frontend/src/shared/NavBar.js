import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(219,179,190,0.17)',
        height: theme.spacing(2.5),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: 'rgba(232,98,153,0.18)',
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip);

export default function CustomizedBreadcrumbs({items, ...props}) {
    const breadcrumbItems = items.map(({title}) =>
        <StyledBreadcrumb
            label={title}
        />
    )
    return (
        <Breadcrumbs {...props}>
            {breadcrumbItems}
        </Breadcrumbs>
    );
}
