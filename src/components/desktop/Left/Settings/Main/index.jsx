import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import MenuItem from '../../../../common/MenuItem';
import ListItem from './ListItem';
import ThemChanger from './ThemeChanger';
import KeyboardShortcuts from './KeyBoardShortcuts';
import Sub from '../../../views/Sub';

import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../common/Text';

function Main() {
    const { open, telephone, email, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'settings'}
            animationDirection="right"
            title="Settings"
            onClose={() => updateSettings('open', null)}>
            <Box bgcolor="background.paper">
                <MenuItem
                    onClick={() => updateSettings('open', 'profile')}
                    sx={{ p: 2 }}
                    Icon={() => <Avatar sx={{ height: 90, width: 90, mr: 2 }} />}
                    isx={{ fontSize: 30, mr: 2 }}>
                    <Box>
                        <Text>{telephone}</Text>
                        <Text>{email}</Text>
                    </Box>
                </MenuItem>
                <ListItem Icon={NotificationsIcon} to="notifications" />
                <ListItem Icon={LockIcon} to="privacy" />
                <ListItem Icon={SecurityIcon} to="security" />
                <ThemChanger />
                <ListItem Icon={WallpaperIcon} to="chat-wallpaper" />
                <ListItem Icon={DescriptionIcon} to="request-account-info" />
                <KeyboardShortcuts />
                <ListItem Icon={ContactSupportIcon} to="help" />
            </Box>
        </Sub>
    );
}

export default Main;