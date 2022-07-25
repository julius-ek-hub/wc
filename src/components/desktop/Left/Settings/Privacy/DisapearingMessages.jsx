import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

import Sub from '../../../views/Sub';
import Text from '../../../../common/Text';
import Mobile from '../../../Arts/Mobile';
import Center from '../../../../styled/common/Center';
import Radio from './Radio';

import useSettings from '../../../../../hooks/useSettings';


function DisappearingMessages() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'privacy.disappearingMessages'}
            animationDirection="right"
            title="Disappearing Messages"
            onClose={() => updateSettings('open', 'privacy')}
        >
            <Sub.Container>
                <Center p={2}>
                    <Mobile Content={HistoryToggleOffIcon} />
                </Center>
                <Text color="primary" mt={2} fontSize="small">Start new chats with disappearing messages</Text>

                <Radio.Group defaultValue="off">
                    <Radio.Label label="24 hours" value="24hours" />
                    <Radio.Label label="7 days" value="7days" />
                    <Radio.Label label="90 days" value="90days" />
                    <Radio.Label label="Off" value="off" />
                </Radio.Group>
            </Sub.Container>
        </Sub>
    );
}

export default DisappearingMessages;