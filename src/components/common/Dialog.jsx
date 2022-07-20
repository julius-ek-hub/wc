import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Dialog({ title, buttons, open, onClose, children }) {
    if (!open) return null;
    return (
        <MuiDialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {buttons}
            </DialogActions>
        </MuiDialog>
    );
}
