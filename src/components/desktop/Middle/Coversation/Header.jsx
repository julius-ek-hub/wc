import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';

import DropDownMenu from '../../../common/DropDownMenu';
import MenuItem from '../../../common/MenuItem';
import IconButton from '../../../common/IconButton';
import useChats from '../../../../hooks/useChats';
import StyledHeader from '../../../styled/desktop/Header';

function Header() {
    const { activeChat, setUserInfoOpen, updateChats } = useChats();
    let c = activeChat();

    c = c.partnerInfo || c;

    return (
        <StyledHeader component="header">
            <Box onClick={() => setUserInfoOpen(true)}>
                <Avatar src={c.dp} />
                <Box sx={{ ml: 1 }}>
                    <Typography fontSize={14} color="text.primary">{c.givenName || c.telephone}</Typography>
                    <Typography fontSize="small" color="text.primary">Online</Typography>
                </Box>
            </Box>
            <Stack direction="row" columnGap={1}>
                <IconButton Icon={VideocamIcon} />
                <IconButton Icon={PhoneIcon} />
                <HorizontalRuleIcon sx={{ transform: 'rotate(90deg)', color: 'divider' }} />
                <IconButton Icon={SearchRoundedIcon} />
                <DropDownMenu
                    InvokeComponent={props => <IconButton Icon={MoreVertIcon} {...props} />}>
                    <MenuItem label="Contact info" onClick={() => setUserInfoOpen(true)} />
                    <MenuItem label="Select messages" />
                    <MenuItem label="Close chat" onClick={() => {
                        updateChats('active', null);
                        updateChats('tempActive', null);
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