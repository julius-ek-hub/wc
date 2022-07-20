import Stack from '@mui/material/Stack';

import SearchBar from './SearchBar';
import Listings from './Listings';
import SecondaryHeader from '../../SecondaryHeader';
import Animate from '../../../common/Animate';

import useChats from '../../../../hooks/useChats';

function PublicContacts() {
    const { addingChats, updateStore } = useChats();

    return (
        <Animate direction='right' in={addingChats}>
            <Stack>
                <SecondaryHeader
                    title="New Chat"
                    onClose={() => updateStore('addingChats', false)} />
                <SearchBar />
                <Listings />
            </Stack>
        </Animate>
    );
}

export default PublicContacts;