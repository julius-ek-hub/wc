import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import IconButton from '../../../IconButton';
import DropDownMenu from '../../../DropDownMenu';
import MenuItem from '../../../MenuItem';
import Header from '../../../styled/Header';
import Confirm from '../../../Confirm';


import useSettings from '../../../../hooks/useSettings';

function NavBar() {
    const { updateSettings, dp } = useSettings();
    const [logout, setLogout] = useState(false);

    const open = (route) => () => updateSettings('open', route);

    const closeLogoutDialog = () => setLogout(false);

    const logOut = () => {
        closeLogoutDialog()
    }

    return (
        <Header justifyContent="space-between" br>
            <Avatar src={dp} />
            <Stack direction="row" columnGap={1}>
                {/* <IconButton disabled Icon={PanoramaFishEyeIcon} onClick={open('status')} /> */}
                <IconButton Icon={ChatIcon} onClick={open('public-chat')} />
                <DropDownMenu InvokeComponent={(props) => <IconButton Icon={MoreVertIcon} {...props} />}>
                    <MenuItem label="New group" onClick={open('new-group')} />
                    <MenuItem label="Starred messages" disabled />
                    <MenuItem label="Settings" onClick={open('settings')} />
                    <MenuItem label="Logout" onClick={() => setLogout(true)} />
                </DropDownMenu>
                <Confirm
                    title="Log out?"
                    open={logout}
                    onRefuse={closeLogoutDialog}
                    acceptlabel="LOG OUT"
                    onAccept={logOut}>
                    Are you sure you want to log out?
                </Confirm>
            </Stack>
        </Header>
    );
}

export default NavBar;