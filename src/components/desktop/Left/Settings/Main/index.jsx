import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import SecondaryHeader from '../../../SecondaryHeader';
import Animate from '../../../../common/Animate';
import MenuItem from '../../../../common/MenuItem';
import ListItem from './ListItem';
import ThemChanger from './ThemeChanger';

import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../common/Text';

function Main() {
    const { settings, updateStore } = useSettings();

    return (
        <Animate direction='right' in={settings.open === 'settings'}>
            <Stack>
                <SecondaryHeader title="Settings" onClose={() => updateStore('open', null)} />
                <Box flexGrow={1} overflow="auto" className='custom-scrollbar'>
                    <MenuItem
                        onClick={() => updateStore('open', 'profile')}
                        sx={{ p: 2 }}
                        Icon={() => <Avatar sx={{ height: 90, width: 90, mr: 2 }} />}
                        isx={{ fontSize: 30, mr: 2 }}>
                        <Box>
                            <Text>{settings.telephone}</Text>
                            <Text>{settings.email}</Text>
                        </Box>
                    </MenuItem>
                    <ListItem Icon={NotificationsIcon} to="notifications" />
                    <ListItem Icon={LockIcon} to="privacy" />
                    <ListItem Icon={SecurityIcon} to="security" />
                    <ThemChanger />
                    <ListItem Icon={WallpaperIcon} to="chat-wallpaper" />
                    <ListItem Icon={DescriptionIcon} to="request-account-info" />
                    <ListItem Icon={KeyboardIcon} to="keyboard-shortcuts" />
                    <ListItem Icon={ContactSupportIcon} to="help" />
                </Box>
            </Stack>
        </Animate>
    );
}

export default Main;