import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Text from "./Text";

const MenuItem = ({ label, Icon, isx, children, ...rest }) => (
    <MuiMenuItem sx={{ pt: 1 }} {...rest}>
        {Icon && (
            <ListItemIcon sx={{ minWidth: '25px !important' }}>
                <Icon fontSize="small" sx={isx} />
            </ListItemIcon>
        )}
        {label ? <Text>{label}</Text> : children}
    </MuiMenuItem>
);

export default MenuItem;