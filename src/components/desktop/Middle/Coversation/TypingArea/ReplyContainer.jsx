import Box from "@mui/material/Box";

import CloseIcon from '@mui/icons-material/Close';

import useMessages from "../../../../../hooks/useMessages";
import MessageReplyContainer from "../MessageMakeUp/ReplyContainer";

import ButtonWithIcon from "./ButtonWithIcon";
import Animate from "../../../../common/Animate";

function ReplyContainer() {
    const { replyingTo, setReplyIngTo } = useMessages();

    return (
        <Animate in={Boolean(replyingTo)} direction="up">
            <Box display="flex" pl={4}>
                <MessageReplyContainer replyingTo={replyingTo} sx={{ bgcolor: "rgba(0,0,0,0.06)" }} width="calc(100% - 80px)" />
                <ButtonWithIcon sx={{ ml: 2 }} Icon={CloseIcon} onClick={() => setReplyIngTo(null)} animate={false} />
            </Box>
        </Animate>

    );
}

export default ReplyContainer;