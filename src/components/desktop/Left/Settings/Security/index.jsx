import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';

import { lighten, useTheme } from '@mui/material/styles';

import ShieldIcon from '@mui/icons-material/Shield';
import HttpsIcon from '@mui/icons-material/Https';

import Sub from '../../../views/Sub';
import Center from '../../../../styled/common/Center';
import Text from '../../../../common/Text';

import useSettings from '../../../../../hooks/useSettings';
import Box from '@mui/material/Box';


function Security() {
    const { open, updateSettings } = useSettings();
    const { palette } = useTheme();

    const color = ratio => lighten(palette.secondaryHeaderBg, ratio);

    return (
        <Sub
            open={open === 'security'}
            title="Security"
            onClose={() => updateSettings('open', 'settings')}>
            <Box p={3} bgcolor="background.paper">
                <Center>
                    <Center bgcolor={color(0.85)} height={120} width={120} borderRadius={60} position="relative">
                        <ShieldIcon sx={{ fontSize: 90, color: color(0.97) }} />
                        <HttpsIcon fontSize='large' sx={{ position: 'absolute', color: color(0.2) }} />
                    </Center>
                </Center>
                <Text ellipsis={false} mt={2}>
                    Messages and calls in end-to-end encrypted chats stay between you and the people you choose.
                    Not even WhatsApp clone can read or listen to them. <Link underline='none' href="#">Learn more</Link>
                </Text>
                <Box display="flex" mt={2}>
                    <Box alignItems='flex-start' mr={1}>
                        <Checkbox sx={{ p: 0 }} />
                    </Box>
                    <Box>
                        <Text ellipsis={false}>Show security notifications on this computer</Text>
                        <Text ellipsis={false} color="text.disabled">
                            Get notified when your security code changes for a contact's phone. If you have multiple
                            devices, this setting must be enable on each device where you want to get the notifications.
                            <Link underline='none' href="#">Learn more</Link>
                        </Text>
                    </Box>
                </Box>
            </Box>

        </Sub>
    );
}

export default Security;