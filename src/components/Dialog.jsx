import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Grow from '@mui/material/Grow';

import { useTheme, alpha } from '@mui/material/styles';

export default function Dialog({ title, buttons, open, onClose, children, sx, ...rest }) {

    const { palette } = useTheme();

    return (
        <MuiDialog
            open={open}
            onClose={onClose}
            transitionDuration={600}
            TransitionComponent={Grow}
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
                {children}
            </DialogContent>
            {buttons && (
                <DialogActions sx={{ p: 3 }}>
                    {buttons}
                </DialogActions>
            )}
        </MuiDialog>
    );
}
