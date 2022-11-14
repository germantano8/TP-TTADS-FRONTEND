import { styled } from '@mui/material/styles';
import MUIButton from '@mui/material/Button';
import { globalTheme } from '../../styles/theme/globalTheme';

const Button = styled(MUIButton)({
    background: globalTheme.palette.primary.main,
    "&:hover":{
        background:"#FFFFFF",
        color: globalTheme.palette.primary.main,
    }
});

export default Button;