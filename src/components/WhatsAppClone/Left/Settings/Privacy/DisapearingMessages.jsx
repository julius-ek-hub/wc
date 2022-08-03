import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

import Sub from '../../../views/Sub';
import Text from '../../../../Text';
import Mobile from '../../../Arts/Mobile';
import Center from '../../../../styled/Center';
import Radio from './Radio';

import useSettings from '../../../../../hooks/useSettings';


function DisappearingMessages() {
    const { open, updateSettings, privacy } = useSettings();

    const handleChange = (e, v) => {
        updateSettings('privacy', {
            ...privacy,
            disappearingMessages: v === 'off' ? false : Number(v)
        })
    }

    return (
        <Sub
            open={open === 'privacy.disappearingMessages'}
            animationDirection="right"
            title="Disappearing Messages"
            onClose={() => updateSettings('open', 'privacy')}
        >
            <Sub.Container p={3}>
                <Center p={2}>
                    <Mobile Content={HistoryToggleOffIcon} />
                </Center>
                <Text color="primary" mt={2} fontSize="small">Start new chats with disappearing messages</Text>

                <Radio.Group value={privacy.disappearingMessages || 'off'} onChange={handleChange}>
                    <Radio.Label label="24 hours" value={24} />
                    <Radio.Label label="7 days" value={24 * 7} />
                    <Radio.Label label="90 days" value={24 * 90} />
                    <Radio.Label label="Off" value="off" />
                </Radio.Group>
            </Sub.Container>
        </Sub>
    );
}

export default DisappearingMessages;