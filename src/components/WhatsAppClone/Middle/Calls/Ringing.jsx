import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';

import CallButtons from './CallButtons'
import Text from "../../../Text";
import Center from "../../../styled/Center";

function Ringinging({ onAnwer, onReject, from, type }) {
    let Icon = PhoneIcon;
    if (type === 'video') Icon = VideocamIcon;

    return (
        <Center p={1} pl={2} pr={2} justifyContent="space-between !important">
            <Center columnGap={1} overflow="hidden" >
                <Icon fontSize='large' color='disabled' />
                <Text>Incoming {type === 'video' ? 'Video' : ''} ~ Call from {from}</Text>
            </Center>
            <Center columnGap={1}>
                <CallButtons
                    color="unread.main"
                    icolor="background.paper"
                    onClick={onAnwer}
                    Icon={PhoneIcon} />
                <CallButtons.End onClick={onReject} />
            </Center>
        </Center>
    );
}

export default Ringinging;