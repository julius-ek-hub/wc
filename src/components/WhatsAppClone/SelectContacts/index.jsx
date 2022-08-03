import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

import Close from "@mui/icons-material/Close";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DoneIcon from '@mui/icons-material/Done';

import Dialog from "../../Dialog";
import IconButton from "../../IconButton";
import Text from "../../Text";
import SearchBar from "../Left/SearchBar";
import ContactMakeUp from "../../ContactMakeUp";
import styles from "./styles";

import useSettings from "../../../hooks/useSettings";

const SelectContacts = ({
    title,
    open,
    min = 0,
    max = Infinity,
    onSelected,
    onCanceled,
    defaultChecked = [],
    selectedName = "selected",
    multiple = true }) => {

    const [selected, setSelected] = useState([]);

    const { chats } = useSettings();

    const len = selected.length;

    const handleSelect = (c) => {
        if (!multiple) return onSelected(c.id);

        if (selected.includes(c.id))
            return setSelected(selected.filter(s => s !== c.id));

        if (len > max) return;

        setSelected([...selected, c.id]);
    }

    const selectAll = (c) => {
        if (len === chats.length)
            return setSelected([])
        setSelected(chats.map(c => c.id));
    }

    const done = () => {
        if (len < min || len > max) return;
        onSelected(selected);
    }

    useEffect(() => {
        setSelected(defaultChecked || []);
        return () => setSelected([]);
    }, [open])

    return (
        <Dialog title={
            <Box display="flex" alignItems="center">
                <IconButton
                    onClick={onCanceled}
                    Icon={Close}
                    color="inherit"
                    isx={{ fontSize: '2rem' }} />
                <Text {...styles.title}>
                    {title}
                </Text>
                {multiple && <IconButton
                    onClick={selectAll}
                    Icon={PlaylistAddCheckIcon}
                    color="inherit"
                    isx={{ fontSize: '2rem' }} />}
            </Box>
        }
            open={open}
            sx={styles.main}
            buttons={
                multiple && (
                    <>
                        <Text
                            color="inherit">
                            {len} {`contact${len === 1 ? 's' : ''}`} {selectedName}
                        </Text>
                        <IconButton
                            disabled={len < min || len > max}
                            onClick={done}
                            Icon={DoneIcon}
                            sx={styles.done.main}
                            isx={styles.done.icon} />
                    </>
                )
            }
        >
            <SearchBar placeholder="Search..." />
            <List
                sx={{ flexGrow: 1, overflow: 'auto' }}
                className="custom-scrollbar">
                <Text color="primary" m={1} ml={3}>CONTACTS</Text>
                {chats.map((c) => (<ContactMakeUp onClick={() => handleSelect(c)} key={c.id} info={c.partnerInfo} checking={multiple} checked={selected.includes(c.id)} />))}
            </List>
        </Dialog>
    )
}

export default SelectContacts;