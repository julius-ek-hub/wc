import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';

import Upload from './Upload';
import ButtonWithIcon from './ButtonWithIcon';
import TextField from '../../../../TextField';
import EmojiContainer from './EmojiContainer';
import ReplyContainer from './ReplyContainer';
import Animate from '../../../../Animate';
import RecordAudio from './RecordAudio';

import useTypingArea from '../../../../../hooks/useTypingArea';
import useChats from '../../../../../hooks/useChats';
import useMessages from '../../../../../hooks/useMessages';

function TypingArea() {

    const { emoji, text, ...ta } = useTypingArea();
    const { setReplyIngTo, selecting } = useMessages();
    const { active, chatInfo } = useChats();

    const chat = chatInfo(active);

    const recording = chat?.recording;

    useEffect(() => {
        const _ta = ta.textAreaREf.current;
        return () => {
            ta.closeEmojiPicker();
            _ta.value = '';
            ta.setText('');
            setReplyIngTo(null);
        }
    }, [active]);

    if (!chat) return null;

    return (
        <Animate in={!selecting} direction="up">
            <Box bgcolor='primaryHeaderBg' padding='10px 16px'>
                <ReplyContainer />
                <EmojiContainer
                    open={emoji.open && !recording}
                    type={emoji.type}
                    onPicked={ta.handleEmojiPicked} />
                <Box display='flex' alignItems='flex-end' position="relative">
                    {!recording && (
                        <>
                            <Stack direction="row">
                                <ButtonWithIcon show={emoji.open} onClick={ta.closeEmojiPicker} Icon={CloseIcon} />
                                <ButtonWithIcon onClick={ta.openEmojiPicker} Icon={InsertEmoticonIcon} />
                                <ButtonWithIcon show={emoji.open} Icon={GifBoxOutlinedIcon} />
                                <ButtonWithIcon show={emoji.open} Icon={StickyNote2Icon} />
                                <Upload />
                            </Stack>
                            <TextField
                                onChange={ta.handleTextChange}
                                inputRef={ta.textAreaREf}
                                maxRows={5}
                                multiline
                                placeholder="Type a message"
                                size="small" />
                            <ButtonWithIcon animate={false} onClick={() => ta.sendMessage()} show={text} Icon={SendIcon} />
                        </>
                    )}
                    <RecordAudio show={!text} />
                </Box>
            </Box>
        </Animate>
    );
}

export default TypingArea;