import ArchiveIcon from '@mui/icons-material/Archive';

import ChatMakeUp from "./ChatMakeUp";
import ContactsList from "../../ContactsList";
import MenuItem from "../../../MenuItem";
import Text from '../../../Text';

import useSettings from "../../../../hooks/useSettings";


function Listings({ archived, NoChat, filterByUnread, search }) {
    const { chats, updateSettings } = useSettings();

    let _chats = chats
        .filter(c => !c.temp)
        .sort((a, b) => new Date(b.lastMessage?.receipt.sent).getTime() - new Date(a.lastMessage?.receipt.sent).getTime());

    if (search) {
        _chats = _chats.filter(c => {
            let po = c.partnerInfo;
            let un = (po.userName || '').toLowerCase();
            let gn = (po.givenName || '').toLowerCase();
            let tel = (po.telephone || '').toLowerCase();
            let s = search?.toLowerCase() || '';

            return (un.split(s).length > 1) || (gn.split(s).length > 1) || (tel.split(s).length > 1)

        });
    }

    if (archived)
        _chats = _chats.filter(c => c.archived);
    else
        _chats = _chats.filter(c => !c.archived);

    let beforeListComponent = <MenuItem
        showdivider
        dividerOffsetLeft={75}
        dividerOffsetRight={15}
        onClick={() => updateSettings('open', 'archived')
        }
        sx={{ p: 1.4 }}
        Icon={ArchiveIcon}
        label="Archived"
        isx={{ ml: 2.6, mr: 2, color: 'primary.main' }} />

    if (filterByUnread) {
        _chats = _chats.filter(c => c.unread > 0);
        beforeListComponent = <Text color="primary" textAlign="center" p={2}>FILTERED BY UNREAD</Text>
    }

    return (
        <ContactsList
            NoChat={NoChat}
            list={_chats}
            {...(!archived && { beforeListComponent })}
            MakeUpeComponent={({ originalinfo, showdivider }) => (
                <ChatMakeUp id={originalinfo.id} showdivider={showdivider} />
            )}
        />
    );
}

export default Listings;