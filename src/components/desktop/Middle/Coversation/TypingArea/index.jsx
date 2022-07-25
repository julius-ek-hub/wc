import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import MicIcon from '@mui/icons-material/Mic';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';

import UploadButton from './UploadButton';
import ButtonWithIcon from './ButtonWithIcon';
import TextField from '../../../../common/TextField';
import EmojiContainer from './EmojiContainer';
import ReplyContainer from './ReplyContainer';

import useTypingArea from '../../../../../hooks/useTypingArea';

function TypingArea() {

    const { emoji, text, ...ta } = useTypingArea();

    return (
        <Box bgcolor='primaryHeaderBg' padding='10px 16px'>
            <ReplyContainer />
            <EmojiContainer
                open={emoji.open}
                type={emoji.type}
                onPicked={ta.handleEmojiPicked} />
            <Box display='flex' alignItems='flex-end'>
                <Stack direction="row">
                    <ButtonWithIcon show={emoji.open} onClick={ta.closeEmojiPicker} Icon={CloseIcon} />
                    <ButtonWithIcon onClick={ta.openEmojiPicker} Icon={InsertEmoticonIcon} />
                    <ButtonWithIcon show={emoji.open} Icon={GifBoxOutlinedIcon} />
                    <ButtonWithIcon show={emoji.open} Icon={StickyNote2Icon} />
                    <UploadButton />
                </Stack>
                <TextField
                    onChange={ta.handleTextChange}
                    inputRef={ta.textAreaREf}
                    maxRows={5}
                    multiline
                    placeholder="Type a message"
                    size="small" />
                <ButtonWithIcon animate={false} onClick={ta.sendMessage} show={text} Icon={SendIcon} />
                <ButtonWithIcon animate={false} show={!text} Icon={MicIcon} />
            </Box>
        </Box>
    );
}

export default TypingArea;