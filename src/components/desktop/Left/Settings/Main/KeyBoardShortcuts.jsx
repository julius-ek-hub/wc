import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import { darken } from "@mui/material/styles";

import KeyboardIcon from '@mui/icons-material/Keyboard';

import ListItem from "./ListItem";
import Alert from "../../../../common/Alert";
import Text from "../../../../common/Text";

import useDimension from "../../../../../hooks/useDimension";

function KeyboardShortcuts() {
    const [open, setOpen] = useState(false);
    const { lg } = useDimension();

    const StackItem = ({ label, shortcuts }) => (
        <Box display="flex" mt={2.5} alignItems="center" justifyContent="space-between">
            <Text fontSize="small">{label}</Text>
            <Box display="flex" gap="4px">
                {shortcuts.split(' ').map((shortcut, i) => (
                    <Chip size="small" label={shortcut} sx={{
                        borderRadius: 2,
                        border: theme => `1px solid ${darken(theme.palette.primaryHeaderBg, 0.4)}`
                    }} key={i} />)
                )}
            </Box>
        </Box>
    );

    return (
        <>
            <ListItem
                Icon={KeyboardIcon}
                onClick={() => setOpen(true)}
                to="keyboard-shortcuts" />
            <Alert sx={{
                '& .MuiDialog-paper': {
                    width: lg ? '900px' : '600px',
                    maxWidth: 'unset'
                }
            }} open={open} title="Keyboard Shortcuts" onClose={() => setOpen(false)}>
                <Stack direction={lg ? "row" : 'column'}>
                    <Stack width={lg ? "50%" : '100%'}>
                        <StackItem label="Mark as Unread" shortcuts="Ctrl Alt Shift U" />
                        <StackItem label="Archive Chat" shortcuts="Ctrl Alt Shift E" />
                        <StackItem label="Pin Chat" shortcuts="Ctrl Alt Shift P" />
                        <StackItem label="Search Chat" shortcuts="Ctrl Alt Shift F" />
                        <StackItem label="Next Chat" shortcuts="Ctrl Alt Tab" />
                        <StackItem label="New Group" shortcuts="Ctrl Alt Shift N" />
                        <StackItem label="Increase Speed of Selected Voice Message" shortcuts="Shift ." />
                        <StackItem label="Settings" shortcuts="Ctrl Alt ," />
                        <StackItem label="Gif Panel" shortcuts="Ctrl Alt G" />
                    </Stack>
                    <Stack flexGrow={1} pl={lg ? 7 : 0}>
                        <StackItem label="Mute" shortcuts="Ctrl Alt Shift M" />
                        <StackItem label="Delete Chat" shortcuts="Ctrl Alt Backspace" />
                        <StackItem label="Shearch" shortcuts="Ctrl Alt /" />
                        <StackItem label="New Chat" shortcuts="Ctrl Alt N" />
                        <StackItem label="Previous Chat" shortcuts="Ctrl Alt Shift Tab" />
                        <StackItem label="Profile and About" shortcuts="Ctrl Alt P" />
                        <StackItem label="Decrease Speed of Selected Voice Message" shortcuts="Shift ," />
                        <StackItem label="Emoji Panel" shortcuts="Ctrl Alt E" />
                        <StackItem label="Sticker Panel" shortcuts="Ctrl Alt S" />
                    </Stack>
                </Stack>
            </Alert>
        </>

    );
}

export default KeyboardShortcuts;