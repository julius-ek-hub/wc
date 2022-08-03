import { useState } from "react";

import DarkModeIcon from '@mui/icons-material/DarkMode';

import Confirm from "../../../../Confirm";
import ListItem from "./ListItem";
import Radio from "../Privacy/Radio";

import useSettings from "../../../../../hooks/useSettings";
import useLocalStorage from "../../../../../hooks/useLocalStorage";

function ThemChanger() {
    const [open, setOpen] = useState(false);
    const { theme, updateSettings } = useSettings();
    const [selectedTheme, setSelectedTheme] = useState(theme || 'dark');
    const { set } = useLocalStorage();

    const doUpdateStore = () => {
        set('theme', selectedTheme);
        updateSettings('theme', selectedTheme === 'default' ? 'dark' : selectedTheme);
        setOpen(false);
    }

    const handleThemChange = (e, theme) => setSelectedTheme(theme);

    return (
        <>
            <ListItem
                Icon={DarkModeIcon}
                onClick={() => setOpen(true)}
                to="theme" />
            <Confirm
                open={open}
                title="Choose theme"
                onAccept={doUpdateStore}
                onRefuse={() => setOpen(false)}>
                <Radio.Group value={selectedTheme || 'dark'} onChange={handleThemChange}>
                    <Radio.Label label="Light" value="light" sx={{ mt: 0 }} />
                    <Radio.Label label="Dark" value="dark" sx={{ mt: 0 }} />
                    <Radio.Label label="System default" value="default" sx={{ mt: 0 }} />
                </Radio.Group>
            </Confirm>
        </>

    );
}

export default ThemChanger;