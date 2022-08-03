import useSettings from '../../../../../hooks/useSettings';
import Text from '../../../../Text';

import { Reply } from '../../../../styled/MessageMakup';
import FileDescription from './FileDescription';

import { sleep } from '../../../../../utils';
import useChats from '../../../../../hooks/useChats';

function ReplyContainer({ replyingTo, ...rest }) {
    const { _id } = useSettings();
    const { chatInfoFromUserId } = useChats();

    if (!replyingTo) return null;

    const { senderId, message, _id: mId } = replyingTo;
    const fromMe = senderId === _id;
    const user = fromMe ? {} : chatInfoFromUserId(senderId).partnerInfo;

    const scrollToRepliedMessage = async () => {
        const el = document.getElementById(mId);
        if (!el) return;

        const parent = el.parentElement;

        parent.scrollTo({
            top: el.offsetTop - parent.clientHeight / 2,
            behavior: 'smooth'
        });

        await sleep(500)
        el.classList.add('scrolled');
        await sleep(2000)
        el.classList.remove('scrolled');

    }

    return (
        <Reply className='reply' onClick={scrollToRepliedMessage} {...rest}>
            <Text className='sender'>{fromMe ? 'You' : (user.userName || user.telephone)}</Text>
            <FileDescription message={replyingTo} />
            <Text>{message}</Text>
        </Reply>
    );
}

export default ReplyContainer;