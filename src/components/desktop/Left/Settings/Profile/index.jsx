import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import SecondaryHeader from '../../../SecondaryHeader';
import Animate from '../../../../common/Animate';
import Center from '../../../../styled/common/Center';
import TextEditor from '../TextEditor';

import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../common/Text';

function Profile() {
    const { settings, updateStore } = useSettings();

    return (
        <Animate direction='left' in={settings.open === 'profile'}>
            <Stack>
                <SecondaryHeader title="Profile" onClose={() => updateStore('open', 'settings')} />
                <Box flexGrow={1} overflow="auto" className='custom-scrollbar' bgcolor="primaryHeaderBg">
                    <Center m={3}>
                        <Avatar sx={{ height: 200, width: 200 }} />
                    </Center>
                    <TextEditor
                        label="Your name"
                        defaultValue={settings.userName || ''}
                        bgcolor="background.paper"
                        max={19}
                        p={2} />
                    <Text
                        p={2}
                        ellipsis={false}>
                        This is not your username or pin, This name will be visible to your WhatsApp cone contacts
                    </Text>
                    <TextEditor
                        label="About"
                        multiline
                        defaultValue={settings.bio}
                        bgcolor="background.paper"
                        p={2}
                        mt={2} />
                </Box>
            </Stack>
        </Animate>
    );
}

export default Profile;