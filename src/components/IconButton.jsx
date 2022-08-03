import MuiIconButton from '@mui/material/IconButton';

function IconButton({ Icon, isx, ...rest }) {
    return (
        <MuiIconButton {...rest}>
            <Icon sx={isx} />
        </MuiIconButton>
    );
}

export default IconButton;