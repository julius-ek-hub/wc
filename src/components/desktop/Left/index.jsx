import Box from '@mui/material/Box';

import * as Styled from '../../styled/desktop/Left';
import Chats from './Chats';
import StatusList from './StatusList';
import PublicContacts from './PublicContacts';
import Settings from './Settings';

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
            </Box>
        </Styled.Left>
    );
}

export default Left;