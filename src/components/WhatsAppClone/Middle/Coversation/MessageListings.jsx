import { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MessageMakeUp from './MessageMakeUp';
import CircularProgress from '../../../LoadingIndicators/CircularProgress';
import MessageContext from '../../../../contexts/MessageContext';

import useChats from '../../../../hooks/useChats';
import useSettings from '../../../../hooks/useSettings';
import useMessages from '../../../../hooks/useMessages';


function MessageListings() {
    const { messages, fetching, getAllMessage } = useMessages();
    const { active } = useChats();
    const { wallPaperStyle } = useSettings();

    useEffect(() => {
        getAllMessage();
    }, [active])

    return (
        <TransitionGroup
            className="custom-scrollbar"
            style={{
                flexGrow: 1,
                overflow: 'auto',
                paddingBottom: 10,
                ...wallPaperStyle(),
            }}>
            <CSSTransition timeout={100}>
                <CircularProgress loading={fetching} mt={2} />
            </CSSTransition>
            {messages.map(({ _id }) => (
                <CSSTransition key={_id} timeout={500}>
                    <MessageContext.Provider value={_id} >
                        <MessageMakeUp />
                    </MessageContext.Provider>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

export default MessageListings;