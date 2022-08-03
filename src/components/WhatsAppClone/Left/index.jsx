import Box from '@mui/material/Box';

import * as Styled from '../../styled/Left';
import Chats from './Chats';
import Archived from './Archived';
import StatusList from './StatusList';
import PublicContacts from './PublicContacts';
import Settings from './Settings';
import ChatsForNewGroup from './ChatsForNewGroup';

import useDimension from '../../../hooks/useDimension';

function Left() {
    const { mainLeftWidth } = useDimension();

    return (
        <Styled.Left width={mainLeftWidth}>
            <Box>
                <Chats />
                <Archived />
                <StatusList />
                <PublicContacts />
                <Settings />
                <ChatsForNewGroup />
            </Box>
        </Styled.Left>
    );
}

export default Left;