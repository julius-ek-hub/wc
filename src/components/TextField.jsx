import MuiTextField from "@mui/material/TextField";

function TextField({ sx, ...rest }) {
    return (
        <MuiTextField
            inputProps={{ className: 'custom-scrollbar' }}
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                borderRadius: 2,
                ml: 1,
                mr: 1,
                '& .Mui-focused fieldset, & fieldset': {
                    borderWidth: '0px !important',
                    borderColor: 'unset !important'
                },
                ...sx
            }} {...rest} />
    );
}

export default TextField;