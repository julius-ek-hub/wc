import Sub from '../../../views/Sub';
import Center from '../../../../styled/Center';
import Mobile from '../../../Arts/Mobile';
import Text from '../../../../Text';
import MenuItem from '../../../../MenuItem';

import { lighten } from '@mui/material/styles';

import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import FeedIcon from '@mui/icons-material/Feed';
import GroupsIcon from '@mui/icons-material/Groups';

import useSettings from '../../../../../hooks/useSettings';


const MenuItemReformed = (props) => (
    <MenuItem
        sx={{ p: 2 }}
        dividerOffsetLeft={68}
        showdivider
        {...props} />
)


function Help() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'help'}
            title="Help"
            onClose={() => updateSettings('open', 'settings')}>
            <Center flexDirection="column" p={2}>
                <Center
                    height={250}
                    width={250}
                    m={4}
                    borderRadius={125}
                    bgcolor={theme => lighten(theme.palette.secondaryHeaderBg, 0.8)}>
                    <Mobile height={100} width={60} Content={ContactSupportIcon} />
                </Center>
                <Text>Version 1.0.0</Text>
            </Center>
            <Sub.Container p={0}>
                <MenuItemReformed label="Help center" Icon={ContactSupportIcon} />
                <MenuItemReformed label="Contact us" Icon={GroupsIcon} />
                <MenuItemReformed label="Terms and Privacy Policy" Icon={FeedIcon} showdivider={false} />
            </Sub.Container>
        </Sub>
    );
}

export default Help;