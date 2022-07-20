import { useState } from "react";

import Button from "@mui/material/Button";

import DarkModeIcon from '@mui/icons-material/DarkMode';

import Dialog from "../../../../common/Dialog";
import ListItem from "./ListItem";

function ThemChanger() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItem Icon={DarkModeIcon} to="theme" />
            <Dialog
                open={open}
                buttons={<>
                    <Button>Cancel</Button>
                    <Button variant="contained">OK</Button>
                </>} />
        </>

    );
}

export default ThemChanger;