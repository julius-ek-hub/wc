import Box from '@mui/material/Box';

import Text from '../../../../Text';
import Center from '../../../../styled/Center';

function SecurityMessage({ show }) {
    if (!show) return null;

    return (
        <Center>
            <Box sx={{ width: '90%', cursor: 'pointer', bgcolor: 'securityBg', p: 1, pl: 2, pr: 2, borderRadius: 2 }}>
                <Text
                    ellipsis={false}
                    fontSize="small"
                    textAlign="center"
                    cursor="pointer">
                    Messages and calls are end-to-end encrypted. No one outside of this chat, not even
                    us can read or listend to them. Tap to learn more
                </Text>
            </Box>
        </Center>
    );
}



export default SecurityMessage;