import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import useMessage from '../../../../../hooks/useMessage';

import useSettings from '../../../../../hooks/useSettings';

function Check({ message, sx }) {
    const { _id } = useSettings();
    const { deleted } = useMessage(message._id);

    const senderId = message.senderId;
    const receipt = message.receipt;

    if (senderId !== _id || !receipt.sent || deleted(message)) return null;

    let Icon = DoneIcon;
    if (receipt.seen.length > 0 || receipt.received.length > 0) Icon = DoneAllIcon;
    if (message?._new) Icon = PendingActionsIcon;

    return (
        <Icon
            fontSize="small"
            sx={{
                mt: -0.5,
                ml: 0.4,
                color: receipt.seen.length > 0 ? 'check' : 'gray',
                ...sx
            }}
        />
    );
}

export default Check;