import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as colors from '@mui/material/colors';

import SecondaryHeader from '../../../SecondaryHeader';
import Animate from '../../../../common/Animate';

import useSettings from '../../../../../hooks/useSettings';

function ChatWallPaper() {
    const { settings, updateStore } = useSettings();

    return (
        <Animate direction='left' in={settings.open === 'chat-wallpaper'}>
            <Stack>
                <SecondaryHeader title="Set Chat Wallpaper" onClose={() => updateStore('open', 'settings')} />
                <Box display="flex" flexWrap="wrap" gap="10px" justifyContent="center" flexGrow={1} p={3} overflow="auto" className='custom-scrollbar' bgcolor="primaryHeaderBg">
                    {Object.values(colors).map((c, j) => (
                        <Button sx={{ height: 100, width: 100, bgcolor: c[200] }} key={j} />
                    ))}
                </Box>
            </Stack>
        </Animate>
    );
}

export default ChatWallPaper;