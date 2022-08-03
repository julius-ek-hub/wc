import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Center from '../../../../styled/Center';
import TextEditor from '../TextEditor';
import Sub from '../../../views/Sub';

import Text from '../../../../Text';
import Dp from './Dp';

import useSettings from '../../../../../hooks/useSettings';

function Profile() {
    const { bio, userName, open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'profile'}
            title="Profile"
            onClose={() => updateSettings('open', 'settings')}>
            <Dp />
            <TextEditor
                label="Your name"
                defaultValue={userName || ''}
                bgcolor="background.paper"
                max={19}
                p={2} />
            <Text
                p={2}
                ellipsis={false}>
                This is not your username or pin, This name will be visible to your WhatsApp cone contacts
            </Text>
            <TextEditor
                label="About"
                multiline
                defaultValue={bio}
                bgcolor="background.paper"
                p={2}
                mt={2} />
        </Sub>
    );
}

export default Profile;