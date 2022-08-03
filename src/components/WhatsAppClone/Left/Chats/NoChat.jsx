import Divider from '@mui/material/Divider';

import ChatIcon from '@mui/icons-material/Chat';

import Center from '../../../styled/Center';
import Text from '../../../Text';

function NoChat() {

    return (
        <Center flexDirection="column" p={4} height="calc(100% - 120px)">
            <Text alpha={0.5} ellipsis={false} textAlign="center">
                You do not currently have any chat. Click the chat Icon <ChatIcon sx={{ mb: -1 }} /> on the nav bar to add
                new from the public chats.
            </Text>
            <Divider sx={{ width: '100%', m: 1 }} />
            <Text alpha={0.5} ellipsis={false} textAlign="center">
                You may have some chats archived too.
            </Text>
        </Center>
    )
}

export default NoChat;