import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import SecondaryHeader from '../../../SecondaryHeader';
import Text from '../../../../common/Text';
import Animate from '../../../../common/Animate';

import useSettings from '../../../../../hooks/useSettings';
import useLocalStorage from '../../../../../hooks/useLocalStorage';


function Theme() {
    const { settings, updateStore } = useSettings();
    const { set } = useLocalStorage();

    const doUpdateStore = (e, theme) => {
        set('theme', theme);
        updateStore('theme', theme);
    }

    return (
        <Animate direction='left' in={settings.open === 'theme'}>
            <Stack>
                <SecondaryHeader title="Theme" onClose={() => updateStore('open', 'settings')} />
                <Box flexGrow={1} p={3} overflow="auto" className='custom-scrollbar' bgcolor="primaryHeaderBg">
                    <RadioGroup onChange={doUpdateStore} value={settings.theme || 'light'}>
                        <FormControlLabel value="light" control={<Radio />} label={<Text>Light</Text>} />
                        <FormControlLabel value="dark" control={<Radio />} label={<Text>Dark</Text>} />
                    </RadioGroup>
                </Box>
            </Stack>
        </Animate>
    );
}

export default Theme;