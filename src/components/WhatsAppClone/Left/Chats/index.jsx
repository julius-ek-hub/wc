import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import NavBar from './NavBar';
// import Notification from './Notification';
import SearchBar from '../SearchBar';
import Listings from './Listings';
import NoChat from './NoChat';
import useLiveUpdate from '../../../../hooks/useLiveUpdates';

function Chats() {
    const [filterByUnread, setFilter] = useState(false);
    const [search, setSearch] = useState(null);
    const { start } = useLiveUpdate();

    useEffect(() => {
        start();
    }, []);

    return (
        <Stack>
            <NavBar />
            <SearchBar
                placeholder="Search or start new chat"
                filterByUnread={filterByUnread}
                onFilter={() => setFilter(!filterByUnread)}
                onSearch={(value) => setSearch(value)}
                showFilterIcon />
            <Divider />
            <Listings
                NoChat={NoChat}
                filterByUnread={filterByUnread}
                search={search} />
        </Stack>
    );
}

export default Chats;