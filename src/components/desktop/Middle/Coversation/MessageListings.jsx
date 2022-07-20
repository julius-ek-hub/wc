import Box from '@mui/material/Box';
import useMessages from '../../../../hooks/useMessages';

import MessageMakeUp from './MessageMakeUp';
import CircularProgress from '../../../common/LoadingIndicators/CircularProgress';

import MessageContext from '../../../../contexts/MessageContext';
import useChats from '../../../../hooks/useChats';
import { useEffect } from 'react';

function MessageListings() {
    const { messages, fetching, getAllMessage } = useMessages();
    const { active, tempActive } = useChats();

    useEffect(() => {
        getAllMessage();
    }, [])

    return (
        <Box id={`all_messages_for_${active || tempActive}`} className="custom-scrollbar" sx={{
            flexGrow: 1,
            overflow: 'auto',
            transition: '50ms all',
            pb: 2,
            backgroundImage: theme => `url(/bg.${theme.palette.mode}.png)`,
            backgroundSize: 'contain'
        }}>
            <CircularProgress loading={fetching} mt={2} />
            {messages.map(({ _id }) => (
                <MessageContext.Provider key={_id} value={_id}>
                    <MessageMakeUp />
                </MessageContext.Provider>
            ))}
        </Box>
    );
}

export default MessageListings;