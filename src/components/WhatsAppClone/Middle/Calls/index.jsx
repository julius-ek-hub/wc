import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';

import Ringinging from "./Ringing";
import Frame from "./Frame";

import useCalls from "../../../../hooks/useCalls";

function VideoCall() {
    const {
        call,
        remoteTracks,
        localTracks,
        state,
        to,
        status,
        myUID,
        endCall,
        onCamOff,
        onMicMute,
        _id,
        rejectCall,
        acceptCall
    } = useCalls();

    if (!call) return null;

    return (
        <Zoom in={Boolean(call)} unmountOnExit>
            <Box
                position="fixed"
                zIndex={900000000}
                top={10}
                className="call-box"
                right={10}
                bgcolor="background.paper"
                width={500}
                borderRadius={2}
                sx={{
                    '& .caller-info, & .action-btns': {
                        transition: '300ms all',
                        '&:is(.caller-info)': {
                            transform: `scale(${(remoteTracks.length > 0 || localTracks.length > 0) ? '0' : '1'})`,
                            top: 0
                        },
                        '&:is(.action-btns)': {
                            bottom: call.type === 'video' ? -400 : 0
                        }
                    },
                    '&:hover': {
                        '& .caller-info': { transform: 'scale(1)' },
                        '& .action-btns': { bottom: 0 },
                    }
                }}
            >
                {(call?.to._id === _id && !state.accepted) && (
                    <Ringinging
                        onAnwer={acceptCall}
                        onReject={rejectCall}
                        from={call.from.telephone}
                        type={call.type}
                    />
                )}
                {(call?.to._id !== _id || state.accepted) && (
                    <Frame
                        myUID={myUID}
                        remoteTracks={remoteTracks}
                        to={to}
                        state={state}
                        type={call.type}
                        status={status}
                        onEnd={endCall}
                        onCamOff={onCamOff}
                        onMute={onMicMute}
                    />
                )}
            </Box>
        </Zoom>
    );
}

export default VideoCall;