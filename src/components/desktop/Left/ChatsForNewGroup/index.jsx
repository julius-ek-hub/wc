import ContactMakeUp from "../../../common/ContactMakeUp";

import Stack from '@mui/material/Stack';

import SearchBar from "../SearchBar";
import SecondaryHeader from '../../SecondaryHeader';
import Animate from '../../../common/Animate';

import useSettings from '../../../../hooks/useSettings';

function ChatsForNewGroup() {
    const { updateSettings, open } = useSettings()

    return (
        <Animate direction='right' in={open === 'new-group'}>
            <Stack>
                <SecondaryHeader
                    title="New Chat"
                    onClose={() => updateSettings('open', null)} />
                <SearchBar placeholder="Type contact name" hideArrowIcon />
                Hello
            </Stack>
        </Animate>
    );
}

export default ChatsForNewGroup;