import Box from '@mui/material/Box';

import * as Styled from '../../styled/desktop/Left';
import Chats from './Chats';
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
                <StatusList />
                <PublicContacts />
                <Settings />
                <ChatsForNewGroup />
            </Box>
        </Styled.Left>
    );
}

export default Left;