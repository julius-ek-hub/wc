import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as colors from '@mui/material/colors';

import Sub from '../../../views/Sub';

import useSettings from '../../../../../hooks/useSettings';

function ChatWallPaper() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'chat-wallpaper'}
            title="Set Chat Wallpaper"
            onClose={() => updateSettings('open', 'settings')}
        >
            <Box p={3} display="flex" flexWrap="wrap" gap="10px" justifyContent="center">
                {Object.values(colors).map((c, j) => (
                    <Button sx={{ height: 100, width: 100, bgcolor: c[200] }} key={j} />
                ))}
            </Box>
        </Sub>
    );
}

export default ChatWallPaper;