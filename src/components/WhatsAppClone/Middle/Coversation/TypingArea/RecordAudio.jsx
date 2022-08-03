
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';

import MicIcon from '@mui/icons-material/Mic';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import ButtonWithIcon from './ButtonWithIcon';
import Animate from '../../../../Animate';
import Center from '../../../../styled/Center';
import Text from '../../../../Text';

import useMedia from '../../../../../hooks/useMedia';
import useSettings from '../../../../../hooks/useSettings';
import useChats from '../../../../../hooks/useChats';
import useTypingArea from '../../../../../hooks/useTypingArea';
import useAudioPlayer from '../../../../../hooks/useAudioPlayer';

import { recordTime, blobURL } from '../../../../../utils';
import useMessages from '../../../../../hooks/useMessages';

function RecordAudio({ show }) {

    const ta = useTypingArea();

    const { recordAudio } = useMedia();
    const { updateChat } = useSettings();
    const { active, chatInfo } = useChats();
    const { selecting } = useMessages();


    const recorder = useRef();
    const interval = useRef();
    const intervalValue = useRef(0);

    const [recorderState, setRecorderState] = useState({});
    const [recorderDuration, setRecorderDuration] = useState(0);

    const audio = useAudioPlayer(recorderDuration);

    const chat = chatInfo(active);

    const updateRecorderState = (update) => {
        setRecorderState({
            ...recorderState,
            ...update
        })
    }

    const stopTimer = () => clearInterval(interval.current);

    const startTimer = () => {
        stopTimer();
        interval.current = setInterval(() => {
            intervalValue.current++;
            setRecorderDuration(intervalValue.current);
        }, 1000);
    }

    const record = async () => {
        try {
            updateRecorderState({ loading: true });
            updateChat(active, 'recording', true);
            const _recorder = await recordAudio();
            await _recorder.start();
            startTimer();
            recorder.current = _recorder;
        } catch (err) {
            updateChat(active, 'recording', undefined);
        }
        finally {
            updateRecorderState({ loading: false });
        }
    }

    const pause = async () => {
        try {
            updateRecorderState({ loading: true })
            let _rec = recorder.current;
            let paused = await _rec.pause();
            stopTimer();
            const file = blobURL(paused);
            updateRecorderState({
                file,
                paused: true,
                loading: false,
            });
        } catch (e) {
            console.log(e)
            updateRecorderState({ loading: false })
        }

    }
    const resume = async () => {
        let _rec = recorder.current;
        updateRecorderState({ loading: true });
        await _rec.resume();
        startTimer();
        updateRecorderState({
            paused: false,
            loading: false
        })
    }

    const stop = async () => {
        try {

            let _rec = recorder.current;
            updateRecorderState({ loading: true })
            let blob = await _rec.stop();
            let duration = recorderDuration;
            intervalValue.current = 0;
            return { blob, duration };
        } catch (e) { }

        finally {
            setRecorderState({ loading: false });
            stopTimer();
            updateChat(active, 'recording', undefined);
            setRecorderDuration(0);
        }
    }

    const send = async () => {
        const result = await stop();
        ta.sendFile({
            url: blobURL(result.blob),
            type: 'voice',
            duration: result.duration
        });
    }

    useEffect(() => {
        if (selecting) stop();

    }, [selecting])

    return (
        <>
            <ButtonWithIcon
                onClick={record}
                animate={false}
                show={show && !chat.recording}
                Icon={MicIcon} />

            <Animate in={Boolean(chat.recording)} type="fade">
                <Box
                    flexGrow={1}
                    display="flex"
                    p={recorderState.loading ? 2 : 0}
                    justifyContent="flex-end">
                    <ButtonWithIcon
                        animate={false}
                        show={!recorderState.loading}
                        onClick={stop}
                        Icon={DeleteIcon} />
                    {(!recorderState.paused || recorderState.loading) ? (
                        <Center width={300}>
                            {!recorderState.loading && (
                                <Box ml={1}><Text>{recordTime(recorderDuration)}</Text></Box>
                            )}
                            <Box width="100%" mr={1} ml={1}>
                                <LinearProgress />
                            </Box>
                        </Center>
                    ) : (
                        <Center width={300}
                            bgcolor="background.paper"
                            borderRadius={10}
                        >
                            <ButtonWithIcon
                                animate={false}
                                show
                                onClick={audio.togglePlayBack}
                                sx={{ ml: 0.4, mr: 1 }}
                                Icon={audio.state.playing ? PauseIcon : PlayArrowIcon} />
                            <Slider sx={{ flexGrow: 1 }} size="small" value={audio.playBackSliderPosition} onChange={audio.handlerPlaySliderChange} />
                            <audio src={recorderState.file} hidden ref={audio.ref} />
                            <Box mr={2} ml={1.5}>
                                <Text >{audio.playBackCurrentTime}</Text>
                            </Box>
                        </Center>
                    )}
                    <ButtonWithIcon
                        color="error"
                        show={Boolean(recorderState.paused && !recorderState.loading)}
                        onClick={resume}
                        direction='up'
                        Icon={MicIcon} />
                    <ButtonWithIcon
                        color="error"
                        show={Boolean(!recorderState.paused && !recorderState.loading)}
                        onClick={pause}
                        direction='up'
                        Icon={PauseCircleOutlinedIcon} />
                    <ButtonWithIcon
                        animate={false}
                        onClick={send}
                        color="primary"
                        show={!recorderState.loading}
                        Icon={SendIcon} />
                </Box>
            </Animate>

        </>
    );
}

export default RecordAudio;