import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import Sub from '../../../views/Sub';
import MenuItem from '../../../../common/MenuItem';
import Center from '../../../../styled/common/Center';

import { useTheme, lighten } from '@mui/material/styles';

import FeedIcon from '@mui/icons-material/Feed';

import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../common/Text';



function AccountInfo() {
    const { open, updateSettings } = useSettings();
    const { palette } = useTheme();

    const color = ratio => lighten(palette.secondaryHeaderBg, ratio);

    return (
        <Sub
            open={open === 'request-account-info'}
            title="Request Account Info"
            onClose={() => updateSettings('open', 'settings')}
        >
            <Sub.Container p={0}>
                <Center>
                    <Center
                        mt={3}
                        height={100}
                        width={100}
                        borderRadius={50}
                        bgcolor={color(0.85)}>
                        <FeedIcon sx={{ fontSize: '3rem', color: color(0.2) }} />
                    </Center>
                </Center>
                <Text ellipsis={false} p={4} fontSize="medium">
                    Create a report of your WhatsApp account information and settings, which you can access or
                    port to another app. This report does not include your messages. <Link>Learn more</Link>
                </Text>
                <Divider />
                <MenuItem
                    sx={{ p: 2 }}
                    Icon={FeedIcon}
                    isx={{ mr: 2, ml: 1, fontSize: '1.7rem' }}
                    label="Request report" />
                <Divider sx={{ mt: '0px !important' }} />
                <Text ellipsis={false} p={4} alpha={0.5} fontSize="small">
                    Your report will be ready in about 3 days. You will have a few weeks to download your report after it's
                    available. <br />
                    Your request will be cancelled if you make changes to your account such as changing your number or deleting your
                    account.
                </Text>
            </Sub.Container>
        </Sub>
    );
}

export default AccountInfo;