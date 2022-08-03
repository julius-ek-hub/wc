import {
    Stack,
    Box,
    alpha,
    Avatar,
} from '@mui/material';

import Center from "../../../styled/Center";
import Text from "../../../Text";
import CallButtons from './CallButtons';

function Frame({ remoteTracks, myUID, to, status, onEnd, state, onMute, onCamOff, type }) {

    return (
        <Box position="relative" height={'350px !important'} overflow="hidden" borderRadius={2}>
            <Box
                id={`user-${myUID}`}
                height="100%"
                width="100%"
            />
            <Box position="absolute" width="100%" className="caller-info">
                <Center flexDirection="column" p={3}>
                    <Avatar sx={{ height: 70, width: 70, mb: 2 }} />
                    <Text variant="h5">
                        {to.givenName || to.telephone || to.userName || 'Unknown'}
                    </Text>
                    <Text mt={1} alpha={0.5} maxWidth={200}>{status}</Text>
                </Center>
            </Box>
            <Box position="absolute" width="100%" className="action-btns">
                {(remoteTracks.length > 0) && (
                    <Stack p={1}
                        direction="row"
                        columnGap={2}
                        overflow="auto"
                        sx={{
                            '&>*': {
                                flexShrink: 0
                            }
                        }}
                        justifyContent="space-between"
                        className="custom-scrollbar"
                        bgcolor={theme => alpha(theme.palette.primaryHeaderBg, 0.4)}
                    >
                        {remoteTracks.map((track) => (
                            <Box
                                width={100}
                                key={track.uid}
                                bgcolor="background.paper"
                                id={`user-${track.uid}`}
                                height={100} />
                        ))}
                    </Stack>
                )}
                <Stack p={2}
                    direction="row"
                    columnGap={2}
                    justifyContent="space-between"
                    bgcolor={theme => alpha(theme.palette.primaryHeaderBg, 0.4)}
                >
                    <CallButtons.CamSwitch />
                    <CallButtons.Bluetooth />
                    {type === 'video' && (
                        <CallButtons.CamOff
                            disabled={state.loading || state.ended}
                            color={state.camOff ? 'white' : 'inherit'}
                            icolor={state.camOff ? 'primary.main' : 'inherit'}
                            onClick={onCamOff} />
                    )}
                    <CallButtons.MicOff
                        color={state.muted ? 'white' : 'inherit'}
                        disabled={state.loading || state.ended}
                        icolor={state.muted ? 'primary.main' : 'inherit'}
                        onClick={onMute} />
                    <CallButtons.End
                        disabled={state.loading || state.ended}
                        onClick={onEnd} />
                </Stack>
            </Box>
        </Box>
    );
}

export default Frame;