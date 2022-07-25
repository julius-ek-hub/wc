import Stack from '@mui/material/Stack';

import SearchBar from './SearchBar';
import Listings from './Listings';
import SecondaryHeader from '../../SecondaryHeader';
import Animate from '../../../common/Animate';

import useSettings from '../../../../hooks/useSettings';

function PublicContacts() {
    const { updateSettings, open } = useSettings()

    return (
        <Animate direction='right' in={open === 'public-chat'}>
            <Stack>
                <SecondaryHeader
                    title="New Chat"
                    onClose={() => updateSettings('open', null)} />
                <SearchBar />
                <Listings />
            </Stack>
        </Animate>
    );
}

export default PublicContacts;