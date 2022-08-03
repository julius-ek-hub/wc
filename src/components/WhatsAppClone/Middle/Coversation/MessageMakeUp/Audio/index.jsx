import { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';
import CircularProgress from "@mui/material/CircularProgress";

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import Center from "../../../../../styled/Center";
import IconButton from "../../../../../IconButton";
import Receipt from "../Receipt";
import Text from "../../../../../Text";

import useAudioPlayer from "../../../../../../hooks/useAudioPlayer";
import useMessage from "../../../../../../hooks/useMessage";


let Error = () => <ReportProblemIcon color="error" fontSize="medium" sx={{ ml: 1, mr: 1 }} />
let Loading = () => <CircularProgress size={30} sx={{ ml: 1, mr: 1 }} />

function Audio() {
    const { message, iSent } = useMessage();
    let file = message.file;

    const audio = useAudioPlayer(file?.duration);

    if (file?.type !== 'voice') return null;

    let Icon = PlayArrowIcon;
    if (audio.state.playing) Icon = PauseIcon;
    if (audio.state.error) Icon = Error;
    if (audio.state.loading) Icon = Loading;

    const avatarSX = { height: 55, width: 55 };

    return (
        <Center minWidth={300} pr={1}>
            {iSent && <Avatar sx={avatarSX} />}
            <IconButton
                Icon={Icon}
                onClick={audio.togglePlayBack}
                disableRipple
                isx={{ fontSize: '2.2rem' }}
                sx={{ p: 0, mr: 1 }} />
            <Box
                display="flex"
                flexGrow={1}
                flexDirection="column"
                position="relative">
                <Slider
                    size="small"
                    value={audio.playBackSliderPosition}
                    onChange={audio.handlerPlaySliderChange}
                    disableSwap />
                <audio
                    src={message.file.url}
                    hidden ref={audio.ref}
                />
                <Box
                    position="absolute"
                    top={22}
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex">
                    <Text fontSize="small">{audio.playBackCurrentTime}</Text>
                    <Receipt sx={{ m: '0px !important' }} />
                </Box>
            </Box>
            {!iSent && <Avatar sx={{ ...avatarSX, ml: 1 }} />}
        </Center>

    );
}

export default Audio;