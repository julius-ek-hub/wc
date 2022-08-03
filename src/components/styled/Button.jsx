import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";


const Button = styled(MuiButton)(({ theme, border }) => ({
    ...(border && {
        border: `1px solid ${theme.palette.primary.main}`
    })
}))

export default Button;