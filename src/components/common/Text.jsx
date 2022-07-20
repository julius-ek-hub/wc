import Typography from "@mui/material/Typography";

const Text = ({ children, ellipsis = true, ...rest }) => (
    <Typography
        color="text.primary"
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