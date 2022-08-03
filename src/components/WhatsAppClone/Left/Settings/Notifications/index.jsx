import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Text from '../../../../Text';
import Sub from '../../../views/Sub';

import useSettings from '../../../../../hooks/useSettings';

const Label = ({ label, disabled, ...rest }) => (
    <FormControlLabel
        disabled={disabled}
        control={<Checkbox {...rest} />}
        label={<Text color={disabled ? 'divider' : 'text.primary'}>{label}</Text>} />
)

function Notifications() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'notifications'}
            title="Notifications"
            onClose={() => updateSettings('open', 'settings')}
            bgcolor="primaryHeaderBg"
            p={3}
        >
            <FormGroup>
                <Label defaultChecked label="Mute all notifications" />
                <Label defaultChecked label="Sounds" />
                <Label defaultChecked label="Desktop Alerts" />
                <Label disabled label="Message previews" />
                <Label defaultChecked label="Mute reaction notifications" />
            </FormGroup>
        </Sub>
    );
}

export default Notifications;