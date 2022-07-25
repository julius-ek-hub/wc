import Typography from "@mui/material/Typography";
import { lighten, darken } from "@mui/material/styles";

const Text = ({ children, ellipsis = true, color, ...rest }) => (
    <Typography
        {...(color ? { color } : {
            sx: {
                color: theme => {
                    const mode = theme.palette.mode;
                    const color = theme.palette.text.primary;
                    return (mode === 'light' ? lighten : darken)(color, 0.2);
                }
            }
        })}
        {...(ellipsis && {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        })}
        {...rest}>
        {children}
    </Typography>
)

export default Text;