import * as Styled from '../../../../styled/MessageMakup';

import StickyDate from './StickyDate';
import SecurityMessage from './SecurityMessage';
import NormalMessage from './NormalMessage';

import useMessage from '../../../../../hooks/useMessage';
import useMessages from '../../../../../hooks/useMessages';

function MessageMakeUp() {
    const { message, previous, selected, iSent, sameGroup } = useMessage();
    const { selecting, select } = useMessages();
    if (!message) return null;

    return (
        <>
            <StickyDate previous={previous} now={message} />
            <SecurityMessage show={message.securityMessage} />
            <Styled.MessageMakeUp
                onClick={() => selecting && select(message._id)}
                id={message._id}
                incoming={!iSent}
                selecting={selecting}
                selected={selected}
                sameGroup={sameGroup}>
                <NormalMessage />
            </Styled.MessageMakeUp>
        </>
    );
}



export default MessageMakeUp;