import Checkbox from '@mui/material/Checkbox';

import Sub from '../../../views/Sub';
import Text from '../../../../Text';
import ListItem from './ListItem';

import useSettings from '../../../../../hooks/useSettings';

function Main() {
    const { open, updateSettings, privacy } = useSettings();

    const goTo = id => ({ onClick: () => updateSettings('open', `privacy.${id}`) });

    const privacyValue = (id) => {
        const _privacy = privacy[id];
        if (id === 'disappearingMessages') {
            if (!_privacy || _privacy === 'off') return 'Off';
            if (_privacy) {
                let value = _privacy / 24;
                return value === 1 ? '24 hours' : (value + 'days')
            }
        }
        let type = _privacy?.type || 'everyone';
        if (type === 'everyone') return 'Everyone';
        if (type === 'contacts') return 'My contacts';
        if (type === 'no-one') return 'Nobody';

        return 'My contacts excluding ' + _privacy?.exceptions.length;
    }
    const updateReadReceipt = () => {
        updateSettings('privacy', {
            ...privacy,
            readReceipts: !privacy.readReceipts
        })
    }

    return (
        <Sub
            open={open === 'privacy'}
            title="Privacy"
            onClose={() => updateSettings('open', 'settings')}
        >
            <Sub.Container p={3}>
                <Text color="primary" fontSize="small">Who can see my personal info</Text>
                <ListItem title="Last seen" description={privacyValue('lastSeen')} {...goTo('lastSeen')} />
                <ListItem title="Profile photo" description={privacyValue('dp')} {...goTo('dp')} />
                <ListItem title="About" description={privacyValue('about')} {...goTo('about')} />
                <ListItem
                    divider={false}
                    title="Read receipts"
                    onClick={updateReadReceipt}
                    Icon={() => <Checkbox sx={{ p: 0 }} checked={Boolean(privacy.readReceipts)} />}
                    description="If you turn off, you won't send or receive Read Receipts.
                            Read Receipts are always sent for group chats" />
            </Sub.Container>
            <Sub.Container mt={2} p={3}>
                <Text color="primary" fontSize="small">Disapearing messages</Text>
                <ListItem divider={false} title="Default message timer" description={privacyValue('disappearingMessages')} {...goTo('disappearingMessages')} />
            </Sub.Container>

            <Sub.Container mt={2} p={3}>
                <ListItem title="Groups" description={privacyValue('groups')} {...goTo('groups')} />
                <ListItem divider={false} title="Blocked contacts" description="0" {...goTo('blocked')} />
            </Sub.Container>
        </Sub>
    );
}

export default Main;