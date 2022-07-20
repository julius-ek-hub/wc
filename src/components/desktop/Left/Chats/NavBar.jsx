import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import IconButton from '../../../common/IconButton';
import DropDownMenu from '../../../common/DropDownMenu';
import MenuItem from '../../../common/MenuItem';
import Header from '../../../styled/desktop/Header';
import useChats from '../../../../hooks/useChats';
import useSettings from '../../../../hooks/useSettings';

function NavBar() {
    const { updateStore } = useChats();
    const { updateStore: updateSettings } = useSettings();

    return (
        <Header justifyContent="space-between" br>
            <Avatar />
            <Stack direction="row" columnGap={1}>
                <IconButton Icon={PanoramaFishEyeIcon} onClick={() => updateSettings('open', 'status')} />
                <IconButton Icon={ChatIcon} onClick={() => updateStore('addingChats', true)} />
                <DropDownMenu InvokeComponent={(props) => <IconButton Icon={MoreVertIcon} {...props} />}>
                    <MenuItem label="New group" />
                    <MenuItem label="Starred messages" />
                    <MenuItem label="Settings" onClick={() => updateSettings('open', 'settings')} />
                    <MenuItem label="Logout" />
                </DropDownMenu>
            </Stack>
        </Header>
    );
}

export default NavBar;