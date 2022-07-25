import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";

import Dialog from "./Dialog";

function Confirm({ onAccept, onRefuse, ...rest }) {
    const { palette } = useTheme();
    const border = `1px solid ${palette.primary.main}`;

    return (
        <Dialog {...rest} buttons={<>
            <Button sx={{ border, minWidth: 100 }} onClick={onRefuse}>Cancel</Button>
            <Button variant="contained" onClick={onAccept} sx={{ border }}>OK</Button>
        </>} />
    );
}

export default Confirm;