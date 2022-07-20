import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SecondaryHeader from '../../../SecondaryHeader';
import Animate from '../../../../common/Animate';

import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../common/Text';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Label = ({ label, disabled, ...rest }) => (
    <FormControlLabel
        disabled={disabled}
        control={<Checkbox {...rest} />}
        label={<Text color={disabled ? 'divider' : 'text.primary'}>{label}</Text>} />
)

function Notifications() {
    const { settings, updateStore } = useSettings();

    return (
        <Animate direction='left' in={settings.open === 'notifications'}>
            <Stack>
                <SecondaryHeader title="Notifications" onClose={() => updateStore('open', 'settings')} />
                <Box flexGrow={1} p={3} overflow="auto" className='custom-scrollbar' bgcolor="primaryHeaderBg">
                    <FormGroup>
                        <Label defaultChecked label="Mute all notifications" />
                        <Label defaultChecked label="Sounds" />
                        <Label defaultChecked label="Desktop Alerts" />
                        <Label disabled label="Message previews" />
                        <Label defaultChecked label="Mute reaction notifications" />
                    </FormGroup>
                </Box>
            </Stack>
        </Animate>
    );
}

export default Notifications;