import Button from "@mui/material/Button";

import Dialog from "./Dialog";

function Alert({ children, onClose, ...rest }) {

    return (
        <Dialog {...rest} buttons={<>
            <Button variant="contained" onClick={onClose} size="large">OK</Button>
        </>} >{children}</Dialog>
    );
}

export default Alert;