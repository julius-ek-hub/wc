import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import NavBar from './NavBar';
// import Notification from './Notification';
import SearchBar from '../SearchBar';
import Listings from './Listings';

function Chats() {
    return (
        <Stack>
            <NavBar />
            <SearchBar placeholder="Search or start new chat" showFilterIcon />
            <Divider />
            <Listings />
        </Stack>
    );
}

export default Chats;