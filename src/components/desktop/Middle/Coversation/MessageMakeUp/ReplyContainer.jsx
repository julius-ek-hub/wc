import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../common/Text';

import { Reply } from '../../../../styled/desktop/MessageMakup';

function ReplyContainer({ replyingTo, ...rest }) {
    const { settings } = useSettings();

    if (!replyingTo) return null;

    const { sender, message } = replyingTo;
    const fromMe = sender._id === settings._id;

    return (
        <Reply className='reply' {...rest}>
            <Text className='sender'>{fromMe ? 'You' : (sender.userName || sender.telephone)}</Text>
            <Text>{message}</Text>
        </Reply>
    );
}

export default ReplyContainer;