
import Details from './Details';
import ContactMakeUp from '../../../../ContactMakeUp';

import useChats from '../../../../../hooks/useChats';

const pathIncludes = (event, cName) => {
    return event.nativeEvent.path.map(el => String(el.className)).some(className => className.match(cName));
}

const ChatMakeUp = ({ id, showdivider }) => {
    const { chatInfo, active, setActiveChat } = useChats();

    const c = chatInfo(id);
    const isActive = active === id;

    const openChat = (e) => {
        if (!pathIncludes(e, 'dropdown-menu-button') && pathIncludes(e, 'MuiCollapse-root'))
            setActiveChat(id);
    }

    return (
        <ContactMakeUp
            sx={{ pt: 0.7 }}
            active={String(isActive)}
            onClick={openChat}
            info={c.partnerInfo}
            detailsComponent={<Details details={c} showdivider={String(showdivider)} />}
        />
    )
}

export default ChatMakeUp;