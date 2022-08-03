import Divider from "@mui/material/Divider";

import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Text from "./Text";
import { ListItemText } from "@mui/material";

const MenuItem = ({ label, Icon, sx, isx, showdivider = false, dividerOffsetLeft = 0, dividerOffsetRight = 0, children, ...rest }) => (
    <MuiMenuItem sx={{
        pt: 1,
        ...sx,
        position: 'relative',
        '&:hover .MuiDivider-root': { visibility: 'hidden' }
    }} {...rest}>
        {Icon && (
            <ListItemIcon >
                <Icon fontSize="small" sx={{ mr: 2, ml: 1, fontSize: '1.7rem', ...isx }} />
            </ListItemIcon>
        )}
        <ListItemText>
            {label ? <Text>{label}</Text> : children}
            {showdivider && (
                <Divider sx={{
                    bottom: 0,
                    position: 'absolute',
                    left: dividerOffsetLeft,
                    right: dividerOffsetRight
                }} />
            )}
        </ListItemText>
    </MuiMenuItem>
);

export default MenuItem;