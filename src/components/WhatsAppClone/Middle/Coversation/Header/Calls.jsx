import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import IconButton from "../../../../IconButton";

import useChats from '../../../../../hooks/useChats';
import useSettings from "../../../../../hooks/useSettings";


function Calls() {

    const { updateSettings, call, simpleInfo } = useSettings();
    const { chatInfo } = useChats();

    const chat = chatInfo();

    const startCall = (type) => () => {
        updateSettings('call', {
            from: simpleInfo,
            to: chat.partnerInfo,
            type
        })
    }

    return (
        <>
            <IconButton onClick={startCall('video')} Icon={VideoCallIcon} disabled={Boolean(call)} />
            <IconButton onClick={startCall('audio')} Icon={AddIcCallIcon} disabled={Boolean(call)} />
        </>
    );
}

export default Calls;