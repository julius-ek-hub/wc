import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import * as colors from '@mui/material/colors';
import { lighten } from '@mui/material/styles';

import Sub from '../../../views/Sub';
import Center from '../../../../styled/Center';
import Text from '../../../../Text';

import useSettings from '../../../../../hooks/useSettings';

function ChatWallPaper() {
    const { open, updateSettings, wallPaperStyle, wallpaper, wallpaper_preview } = useSettings();

    const ColorBox = ({ color }) => {
        if (!color) return null;
        return (
            <Center
                sx={{
                    ...wallPaperStyle(color),
                    height: 70,
                    width: 70,
                    border: theme => `5px solid ${color === wallpaper ? lighten(theme.palette.secondaryHeaderBg, 0.4) : 'transparent'}`,
                    cursor: 'pointer',
                    borderRadius: 0.5,
                    ...((color === wallpaper_preview && color !== wallpaper) && {
                        border: theme => `5px solid ${theme.palette.common.white}`
                    })
                }}
                onMouseEnter={() => {
                    if (wallpaper_preview !== color)
                        updateSettings('wallpaper_preview', color);
                }}
                onMouseOut={() => updateSettings('wallpaper_preview', undefined)}
                onClick={() => {
                    updateSettings('wallpaper', color);
                }}
            >
                {color === 'default' && <Text fontSize="small">Default</Text>}
            </Center>
        )
    };

    return (
        <Sub
            open={open === 'chat-wallpaper'}
            title="Set Chat Wallpaper"
            p={3}
            onClose={() => updateSettings('open', 'settings')}
        >
            <Center>
                <FormControlLabel
                    control={<Checkbox />}
                    label={"Add WhatsApp clone doodles"}
                    sx={{ mt: 2 }}
                    disabled />
            </Center>
            <Box p={3} display="flex" flexWrap="wrap" gap="10px" justifyContent="center">
                <ColorBox
                    color="default"
                />
                {Object.values(colors).map((c, index) => (
                    <ColorBox
                        key={index}
                        color={c[200]}
                    />
                ))}
            </Box>
        </Sub>
    );
}

export default ChatWallPaper;