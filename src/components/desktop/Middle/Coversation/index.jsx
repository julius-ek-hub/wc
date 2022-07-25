import Stack from '@mui/material/Stack';

import Header from './Header';
import MessageListings from './MessageListings';
import TypingArea from './TypingArea';
import NoChatOpen from './NoChatOpen';
import Animate from '../../../common/Animate';

import useChats from '../../../../hooks/useChats';
import useSettings from '../../../../hooks/useSettings';

function Conversation() {
    const { active, tempActive } = useChats();
    const { open } = useSettings();
    const show = open !== 'status';

    if (!active && !tempActive) return <NoChatOpen show={show} />;

    return (
        <Animate type='fade'
            in={show}>
            <Stack>
                < Header />
                <MessageListings />
                <TypingArea />
            </Stack >
        </Animate>

    );
}

export default Conversation;