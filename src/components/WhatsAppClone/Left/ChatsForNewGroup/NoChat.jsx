import ChatIcon from '@mui/icons-material/Chat';
import NNoChat from '../NoChat';

function NoChat() {
    return (
        <NNoChat>
            You do not currently have any chat. Navigate back home and Click the chat
            Icon <ChatIcon sx={{ mb: -1 }} /> on the nav bar to add new from the public chats.
        </NNoChat>
    )
}

export default NoChat;