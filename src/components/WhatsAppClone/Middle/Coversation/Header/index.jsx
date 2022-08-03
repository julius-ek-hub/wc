import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import DropDownMenu from '../../../../DropDownMenu';
import MenuItem from '../../../../MenuItem';
import IconButton from '../../../../IconButton';
import useChats from '../../../../../hooks/useChats';
import StyledHeader from '../../../../styled/Header';
import Animate from '../../../../Animate';
import Text from '../../../../Text';
import Calls from './Calls';

import useSettings from '../../../../../hooks/useSettings';
import useConnection from '../../../../../hooks/useConnection';

import { date } from '../../../../../utils';

function Header() {
    const { activeChat, setUserInfoOpen, updateChats, active } = useChats();
    const { updateChat } = useSettings();
    const conn = useConnection();
    const chat = activeChat();
    const c = chat?.partnerInfo;
    const ls = chat?.lastSeen;

    useEffect(() => {
        if (c && !ls) {
            conn.emit('last-seen', c._id).then(({ data }) => {
                const lastSeen = data.lastSeen;
                lastSeen && updateChat(chat.id, 'lastSeen', lastSeen)
            })
        }
        if (!c) {
            updateChats('active', null);
        }
    }, [active, c])

    if (!c) return null;

    return (
        <StyledHeader component="header">
            <Box onClick={() => setUserInfoOpen(true)}>
                <Avatar src={c.dp} />
                <Box sx={{ ml: 1 }}>
                    <Text fontSize={14} >{c.givenName || c.telephone}</Text>
                    <Animate in={Boolean(ls)}>
                        <Box><Text fontSize="small">{ls === 'Online' ? 'Online' : date(ls).sticky}</Text></Box>
                    </Animate>
                </Box>
            </Box>
            <Stack direction="row" columnGap={1}>
                <Calls />
                <HorizontalRuleIcon sx={{ transform: 'rotate(90deg)', color: 'divider' }} />
                <IconButton Icon={SearchRoundedIcon} />
                <DropDownMenu
                    InvokeComponent={props => <IconButton Icon={MoreVertIcon} {...props} />}>
                    <MenuItem label="Contact info" onClick={() => setUserInfoOpen(true)} />
                    <MenuItem label="Select messages" />
                    <MenuItem label="Close chat" onClick={() => {
                        updateChats('active', null);
                        setUserInfoOpen(false);
                    }} />
                    <MenuItem label="Mute notifications" />
                    <MenuItem label="Disapearing messages" />
                    <MenuItem label="Clear messages" />
                    <MenuItem label="Delete chat" />
                </DropDownMenu>
            </Stack>
        </StyledHeader >
    );
}

export default Header;