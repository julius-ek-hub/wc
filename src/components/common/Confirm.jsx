import Button from "@mui/material/Button";

import Dialog from "./Dialog";

function Confirm({ okText, cancelText, open, children, onAccept, onRefuse, ...rest }) {
    return (
        <Dialog buttons={<>
            <Button>Cancel</Button>
            <Button variant="contained">OK</Button>
        </>} />
    );
}

export default Confirm;