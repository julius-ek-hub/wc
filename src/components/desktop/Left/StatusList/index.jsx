import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import PublicContacts from '../PublicContacts/Listings';
import Header from '../../../styled/desktop/Header';
import Animate from '../../../common/Animate';
import MenuItem from '../../../common/MenuItem';
import Text from '../../../common/Text';

import useSettings from '../../../../hooks/useSettings';

function StatusList() {
    const { updateSettings, open } = useSettings();

    return (
        <Animate type='fade' in={open === 'status'}>
            <Stack>
                <Header p={0} sx={{ p: 0, pt: 2, pb: 1 }}>
                    <MenuItem
                        onClick={() => updateSettings('open', null)}
                        sx={{ p: 1, width: '100%', pl: 3 }}
                        Icon={() => <Avatar />}>
                        <Box ml={1}>
                            <Text>My Status</Text>
                            <Text fontSize="small">No updates</Text>
                        </Box>
                    </MenuItem>
                </Header>
                <PublicContacts />
            </Stack>
        </Animate>
    );
}

export default StatusList;