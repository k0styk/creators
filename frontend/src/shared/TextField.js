import React from 'react';
import TextFieldUi from '@material-ui/core/TextField';
import withStylesUi from '@material-ui/core/styles/withStyles';
import {createStyles} from '@material-ui/core/styles';


const StyledTextField = withStylesUi(({palette}) => createStyles({
  root: {
    '& [class*="notchedOutline"]': {
      border: 'none',
    },
    '& [class*="MuiInputBase-input"]': {
      'padding': 0,
      'minHeight': '20px',
      '&:disabled': {
        opacity: 0.5,
      },
      '&::placeholder': {
        color: 'gray',
        opacity: 1,
      },
      '&:focus, &:focus-within': {
        'borderColor': 'gray',
        '&::placeholder': {
          opacity: 0.5,
        },
      },
    },
    '& [class*="MuiFormHelperText-root"]': {
      fontSize: '12px',
      margin: '0px',
      lineHeight: '16px',
    },

    '& [class*="MuiOutlinedInput-root"]': {
      'padding': '8px 12px',
      'borderRadius': '4px',
      'fontSize': '14px',
      'lineHeight': '20px',
      'border': `1px solid ${'rgba(226, 226, 226, 0.6)'}`,
      '&:hover:not(:focus):not(:disabled)': {
        borderColor: 'rgba(217,217,217,0.83)',
      },
      '&:focus, &:focus-within': {
        border: `1px solid ${'rgba(217,217,217,0.83)'}`,
      },
      '& svg': {
        fontSize: '20px',
      },
    },
  },
}))(TextFieldUi);

const TextField= (props) => (
  <StyledTextField
    {...props}
  />
);

export default TextField;
