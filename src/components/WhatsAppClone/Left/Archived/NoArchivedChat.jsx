import { lighten } from '@mui/material/styles';

import ArchiveIcon from '@mui/icons-material/Archive';

import Center from "../../../styled/Center";
import Text from '../../../Text';

function NoArchivedChat() {
    return (
        <Center flexDirection="column" height="100%">
            <Center
                height={150}
                width={150}
                borderRadius={75}
                mb={2}
                bgcolor={theme => lighten(theme.palette.secondaryHeaderBg, 0.9)}>
                <ArchiveIcon sx={{
                    fontSize: '4rem',
                    color: theme => lighten(theme.palette.secondaryHeaderBg, 1)
                }} />
            </Center>
            <Text alpha={0.5}>No archived chat</Text>
        </Center>
    )
}

export default NoArchivedChat;