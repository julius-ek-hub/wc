import { memo } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import useExtraResources from '../../hooks/useExtraResources';


function TabBar({ active, onChange }) {
    const { emojis: { groups } } = useExtraResources();

    return (
        <TabContext value={active}>
            <Box>
                <TabList onChange={onChange} sx={{
                    justifyContent: 'center'
                }}>
                    {groups.map(({ group, character }) => (
                        <Tab label={character} value={group} key={group} sx={{
                            fontSize: 25,
                            flexGrow: 1,
                        }} />
                    ))}
                </TabList>
            </Box>
        </TabContext>
    );
}

export default memo(TabBar, (prev, next) => prev.active === next.active);