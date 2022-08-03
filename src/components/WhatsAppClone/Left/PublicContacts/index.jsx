import Stack from '@mui/material/Stack';

import Sub from '../../views/Sub';
import SearchBar from '../SearchBar';
import Listings from './Listings';

import useSettings from '../../../../hooks/useSettings';

function PublicContacts() {
    const { updateSettings, open } = useSettings()

    return (
        <Sub
            title="New Chat"
            open={open === 'public-chat'}
            onClose={() => updateSettings('open', null)}>
            <Sub.Container Component={Stack} height="100%">
                <SearchBar placeholder="Search public contacts" />
                <Listings />
            </Sub.Container>
        </Sub>
    );
}

export default PublicContacts;