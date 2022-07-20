import Stack from '@mui/material/Stack';

import NavBar from './NavBar';
import Notification from './Notification';
import SearchBar from './SearchBar';
import Listings from './Listings';

function Chats() {
    return (
        <Stack>
            <NavBar />
            <SearchBar />
            <Listings />
        </Stack>
    );
}

export default Chats;