import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Group from './Group';
import TabBar from './TabBar';
import TextField from '../TextField';


function EmojiPicker({ onPicked, type }) {

    const [activeGroup, setActiveGroup] = useState('smileys-emotion');

    const [searchPosition, setSearchPosition] = useState('static');

    const lastScrollTop = useRef();


    const handleScroll = ({ target }) => {
        if (lastScrollTop.current - target.scrollTop > 0)
            setSearchPosition('sticky');
        else
            setSearchPosition('static');

        lastScrollTop.current = target.scrollTop;
    }


    return (
        <Stack height="100%">
            <TabBar
                active={activeGroup}
                onChange={(e, newValue) => setActiveGroup(newValue)} />
            <Box
                onScroll={handleScroll}
                flexGrow={1}
                overflow="auto"
                className="custom-scrollbar">
                <Box
                    display="flex"
                    position={searchPosition}
                    p={1}
                    top={-4}
                    zIndex={2}>
                    <TextField
                        placeholder="Search Emoji"
                        size="small"
                        sx={{ borderRadius: 8 }} />
                </Box>
                <Group group={activeGroup} onPicked={onPicked} />
            </Box>
        </Stack>
    );
}

export default EmojiPicker;