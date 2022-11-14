import { styled } from '@mui/material/styles';
import MUITextField from '@mui/material/TextField';

const TextField = styled(MUITextField)({
    ".MuiFormLabel-root.Mui-focused": {
        color: "#5E5E5E"
    },
    "& input:valid ~ fieldset": {
        borderColor: "#5E5E5E",
        borderRightWidth: `6px !important`,
        padding: '4px !important',
    },
    '& input:valid:focus ~ fieldset': {
        borderColor: "#000000",
    },

    '.Mui-error .MuiSvgIcon-root':{
        color:"#d32f2f",
    }
});


export default TextField;