import Checkbox from '@mui/material/Checkbox';

import Sub from '../../../views/Sub';
import Text from '../../../../common/Text';
import ListItem from './ListItem';

import useSettings from '../../../../../hooks/useSettings';

function Main() {
    const { open, updateSettings } = useSettings();

    const goTo = id => ({ onClick: () => updateSettings('open', `privacy.${id}`) });

    return (
        <Sub
            open={open === 'privacy'}
            title="Privacy"
            onClose={() => updateSettings('open', 'settings')}
        >
            <Sub.Container>
                <Text color="primary" fontSize="small">Who can see my personal info</Text>
                <ListItem title="Last seen" description="Everyone" {...goTo('lastSeen')} />
                <ListItem title="Profile photo" description="Everyone" {...goTo('profilePhoto')} />
                <ListItem title="About" description="Everyone" {...goTo('about')} />
                <ListItem
                    divider={false}
                    title="Read receipts"
                    Icon={() => <Checkbox sx={{ p: 0 }} />}
                    description="If you turn off, you won't send or receive Read Receipts.
                            Read Receipts are always sent for group chats" />
            </Sub.Container>
            <Sub.Container mt={2}>
                <Text color="primary" fontSize="small">Disapearing messages</Text>
                <ListItem divider={false} title="Default message timer" description="Off" {...goTo('disappearingMessages')} />
            </Sub.Container>

            <Sub.Container mt={2}>
                <ListItem title="Groups" description="Everyone" {...goTo('groups')} />
                <ListItem divider={false} title="Blocked contacts" description="0" {...goTo('blocked')} />
            </Sub.Container>
        </Sub>
    );
}

export default Main;