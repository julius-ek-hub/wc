import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Divider from "@mui/material/Divider";

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PlusIcon from '@mui/icons-material/Add';

import Header from "../../../../../styled/Header";
import ButtonWithIcon from "../ButtonWithIcon";
import Text from "../../../../../Text";
import TextField from "../../../../../TextField";
import Center from "../../../../../styled/Center";
import EmojiContainer from "../EmojiContainer";

import useDimension from "../../../../../../hooks/useDimension";
import useTypingArea from "../../../../../../hooks/useTypingArea";

import { blobURL, sleep } from "../../../../../../utils";
import useFiles from "../../../../../../hooks/useFiles";

function Preview({ files = [], onDone }) {
    const [active, setActive] = useState(0);
    const [allFiles, setAllFiles] = useState(files);
    const { mainLeftWidth } = useDimension();
    const { emoji, ...ta } = useTypingArea();
    const { chooseImageFromStorage } = useFiles();

    const ImagePreviewBox = ({ active = true, ...rest }) => (
        <Center sx={{
            height: 50,
            width: 50,
            borderRadius: 2,
            flexShrink: 0,
            overflow: 'hidden',
            border: theme => `2px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
            cursor: 'pointer'
        }} {...rest} />
    );

    const deletePreview = () => {
        const _files = [...allFiles];
        _files.splice(active, 1);
        if (_files.length === 0) return onDone();
        if (active > 0) setActive(active - 1);
        setAllFiles(_files);
    }

    const addMoreFiles = async () => {
        const newFiles = await chooseImageFromStorage();
        setAllFiles([...allFiles, ...newFiles]);
    }

    const send = () => {
        const _files = [...allFiles]
        const _send = async (index) => {
            let f = _files[index];
            const toSend = {
                url: blobURL(new Blob([f], { type: f.type })),
                type: f.type.split('/')[0],
            }
            if (index === _files.length - 1) return ta.sendMessage(toSend);
            await sleep(1000);
            ta.sendFile(toSend);
            _send(index + 1);
        }

        _send(0);
        onDone();
    }

    const memoIzedFiles = useMemo(() => {
        return allFiles.map((f, index) => (
            <ImagePreviewBox
                key={index}
                onClick={() => setActive(index)}
                active={active === index} >
                <Box
                    component="img"
                    src={blobURL(new Blob([f], { type: f.type }))}
                    height="100%"
                    width="100%"
                    sx={{ objectFit: 'cover' }}
                />
            </ImagePreviewBox>
        ))
    }, [allFiles, active]);

    return (
        <Backdrop unmountOnExit open={files.length > 0} sx={{
            zIndex: 10,
            flexDirection: 'column',
            bgcolor: 'primaryHeaderBg',
            left: mainLeftWidth,
            overflow: 'hidden'
        }}>
            <Header width="100%" justifyContent="space-between">
                <Text ml={1}>Preview</Text>
                <Center>
                    <ButtonWithIcon Icon={DeleteIcon} sx={{ mr: 1 }} onClick={deletePreview} />
                    <ButtonWithIcon Icon={CloseIcon} sx={{ mr: 1 }} onClick={onDone} />
                </Center>
            </Header>
            <Divider sx={{ width: '100%' }} />
            <Center
                flexGrow={1}
                width="100%"
                overflow="hidden">
                <Box
                    component="img"
                    src={blobURL(new Blob([allFiles[active]], { type: allFiles[active].type }))}
                    height="100%"
                    sx={{ objectFit: 'cover' }}
                />
            </Center>
            <Header component="div" width="100%" flexDirection="column" position="relative">
                <EmojiContainer
                    open={emoji.open}
                    type={emoji.type}
                    onPicked={ta.handleEmojiPicked} />
                <Center width="60%">
                    <ButtonWithIcon show={emoji.open} onClick={ta.closeEmojiPicker} Icon={CloseIcon} />
                    <ButtonWithIcon onClick={ta.openEmojiPicker} Icon={InsertEmoticonIcon} />
                    <TextField
                        multiline
                        placeholder="Type a caption"
                        size="small"
                        width="50%"
                        maxRows={5}
                        onChange={ta.handleTextChange}
                        inputRef={ta.textAreaREf}
                        fullWidth
                    />
                </Center>
                <Center bgcolor="primaryHeaderBg" p={1}>
                    <Center
                        className="custom-scrollbar"
                        columnGap={1}
                        mr={1}
                        maxWidth="60%"
                        flexWrap="nowrap"
                        overflow="auto">
                        {memoIzedFiles}
                    </Center>
                    <ImagePreviewBox onClick={addMoreFiles}>
                        <PlusIcon color="primary" />
                    </ImagePreviewBox>
                </Center>
                <Center justifyContent="flex-end !important" width="100%" pr={2}>
                    <ButtonWithIcon onClick={send} Icon={SendIcon} />
                </Center>
            </Header>
        </Backdrop>
    );
}

export default Preview;