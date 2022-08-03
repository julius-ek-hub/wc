import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import CheckBox from '../../../../CheckBox';

import Text from '../../../../Text';
import StickyDate from './StickyDate';
import ReplyContainer from './ReplyContainer';
import Menu from './Menu';
import ExtraActions from './ExtraActions';
import Receipt from './Receipt';
import Center from '../../../../styled/Center';
import Reactions from './Reactions';
import Audio from './Audio';
import Deleted from './Deleted';
import Image from './Image';

import useMessage from '../../../../../hooks/useMessage';
import useMessages from '../../../../../hooks/useMessages';

function NormalMessage() {
    const messageRef = useRef();
    const { message, send, selected, iSent, index, setSeen, deleted } = useMessage();
    const { messages, selecting } = useMessages();

    useEffect(() => {
        try {
            const mRef = messageRef.current;
            const n1 = new Date(message.receipt.sent).getTime();
            const n2 = new Date().getTime();
            if (index === (messages.length - 1) && ((n2 - n1) / 1000) <= 2) {
                mRef.parentElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } catch (e) { }
        send();
        setSeen();
    }, []);

    if (message.securityMessage) return null;

    return (
        <>
            {selecting && (
                <Center position="absolute" left={2}>
                    <CheckBox checked={selected} />
                </Center>
            )}
            {iSent && <ExtraActions />}
            <Box className='message' ref={messageRef}>
                <ReplyContainer replyingTo={message.replyingTo} />
                <Box>
                    {deleted() ? <Deleted /> : (
                        <>
                            <Audio />
                            <Image />
                            <Box mr={3}>
                                <Text ellipsis={false} component="div" sx={{ wordBreak: 'break-all' }}>
                                    {(message.message || '').split('\n').map((p, key) => <Text ellipsis={false} key={key}>{p}</Text>)}
                                </Text>
                            </Box>
                        </>
                    )}
                    <Menu />
                    {!(message.file && message.file.type === 'voice') && <Receipt message={message} />}
                </Box>
                <Reactions />
            </Box>
            {!iSent && <ExtraActions />}
        </>
    );
}



export default NormalMessage;