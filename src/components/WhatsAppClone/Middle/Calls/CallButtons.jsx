import { IconButton, colors } from '@mui/material';

import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import PhoneBluetoothSpeakerIcon from '@mui/icons-material/PhoneBluetoothSpeaker';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

const CallButtons = ({ Icon, color = "inherit", icolor = "inherit", sx, ...rest }) => (
    <IconButton sx={{
        bgcolor: color,
        p: 1.4,
        '&:hover': {
            bgcolor: color
        },
        ...sx
    }} {...rest}>
        <Icon sx={{ color: icolor, fontSize: 30 }} />
    </IconButton>
);

CallButtons.CamSwitch = (props) => <CallButtons disabled Icon={CameraswitchIcon} {...props} />;

CallButtons.Bluetooth = (props) => <CallButtons disabled Icon={PhoneBluetoothSpeakerIcon} {...props} />;

CallButtons.CamOff = (props) => <CallButtons Icon={VideocamOffIcon} {...props} />;

CallButtons.MicOff = (props) => <CallButtons Icon={MicOffIcon} {...props} />;

CallButtons.End = (props) => <CallButtons color={colors.red.A700} Icon={CallEndIcon} {...props} />;

export default CallButtons;