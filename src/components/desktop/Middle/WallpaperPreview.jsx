import Stack from '@mui/material/Stack';

import Animate from '../../common/Animate';
import Header from '../../styled/desktop/Header';
import Text from '../../common/Text';

import useChats from '../../../hooks/useChats';
import useSettings from '../../../hooks/useSettings';
import Center from '../../styled/common/Center';

function WallpaperPreview() {
    const { active, tempActive } = useChats();
    const { open, wallPaperStyle } = useSettings();

    return (
        <Animate type='fade'
            in={open === 'chat-wallpaper'}>
            <Stack zIndex={20}>
                <Header>
                    <Center width="100%" p={1}>
                        <Text>Wallpaper Preview</Text>
                    </Center>
                </Header>
                <Center sx={{ ...wallPaperStyle(), flexGrow: 1 }} />
                <Header sx={{ p: 4 }} />
            </Stack >
        </Animate>

    );
}

export default WallpaperPreview;