import Stack from '@mui/material/Stack';

import Header from './Header';
import MessageListings from './MessageListings';
import TypingArea from './TypingArea';
import NoChatOpen from './NoChatOpen';
import Selecting from './TypingArea/Selecting';
import Animate from '../../../Animate';

import useChats from '../../../../hooks/useChats';
import useSettings from '../../../../hooks/useSettings';

function Conversation() {
    const { active } = useChats();
    const { open } = useSettings();
    const show = open !== 'status';

    if (!active) return <NoChatOpen show={show && open !== 'chat-wallpaper'} />;

    return (
        <Animate type='fade'
            in={show}>
            <Stack>
                < Header />
                <MessageListings />
                <TypingArea />
                <Selecting />
            </Stack >
        </Animate>

    );
}

export default Conversation;