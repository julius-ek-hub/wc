import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useTheme, alpha } from '@mui/material/styles';

export default function Dialog({ title, buttons, open, onClose, children, sx, ...rest }) {

    const { palette } = useTheme();

    if (!open) return null;
    return (
        <MuiDialog
            open={open}
            onClose={onClose}
            fullWidth
            componentsProps={{
                backdrop: {
                    style: {
                        backgroundColor: alpha(palette.background.paper, 0.7)
                    }
                }
            }}
            sx={{
                ...sx,
                '& .MuiDialog-paper': {
                    boxShadow: theme => theme.shadows[10],
                    ...(sx && sx['& .MuiDialog-paper'])
                },
            }}
            {...rest}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                {buttons}
            </DialogActions>
        </MuiDialog>
    );
}
