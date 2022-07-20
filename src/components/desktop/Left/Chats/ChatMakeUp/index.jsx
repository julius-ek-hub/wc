
import Details from './Details';
import ContactMakeUp from '../../../../common/ContactMakeUp';

import useChats from '../../../../../hooks/useChats';

const ChatMakeUp = ({ id }) => {
    const { chatInfo, active, setActiveChat } = useChats();

    const c = chatInfo(id);
    const isActive = active === id;

    const openChat = (e) => {
        if (e.nativeEvent.path.map(el => String(el.className)).some(className => className.match('dropdown-menu-button'))) {
            console.log('Menu')
        }
        else if (!isActive) {
            setActiveChat(id);
        }
    }

    return (
        <ContactMakeUp
            active={String(isActive)}
            onClick={openChat}
            info={c}
            detailsComponent={<Details details={c} />}
        />
    )
}

export default ChatMakeUp;