import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import IconButton from '../../../common/IconButton';
import DropDownMenu from '../../../common/DropDownMenu';
import MenuItem from '../../../common/MenuItem';
import Header from '../../../styled/desktop/Header';
import useSettings from '../../../../hooks/useSettings';

function NavBar() {
    const { updateSettings } = useSettings();

    const open = (route) => () => updateSettings('open', route);

    return (
        <Header justifyContent="space-between" br>
            <Avatar />
            <Stack direction="row" columnGap={1}>
                <IconButton Icon={PanoramaFishEyeIcon} onClick={open('status')} />
                <IconButton Icon={ChatIcon} onClick={open('public-chat')} />
                <DropDownMenu InvokeComponent={(props) => <IconButton Icon={MoreVertIcon} {...props} />}>
                    <MenuItem label="New group" onClick={open('new-group')} />
                    <MenuItem label="Starred messages" onClick={open('starred-messages')} />
                    <MenuItem label="Settings" onClick={open('settings')} />
                    <MenuItem label="Logout" />
                </DropDownMenu>
            </Stack>
        </Header>
    );
}

export default NavBar;