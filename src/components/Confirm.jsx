import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";

import Dialog from "./Dialog";

function Confirm({ onAccept, onRefuse, acceptlabel = "OK", refuselable = "CANCEL", ...rest }) {
    const { palette } = useTheme();
    const border = `1px solid ${palette.primary.main}`;

    return (
        <Dialog {...rest} buttons={<>
            <Button sx={{ border, minWidth: 100 }} onClick={onRefuse} size="large">{refuselable}</Button>
            <Button variant="contained" onClick={onAccept} sx={{ border }} size="large">{acceptlabel}</Button>
        </>} />
    );
}

export default Confirm;