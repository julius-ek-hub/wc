import Sub from '../../../views/Sub';
import Text from '../../../../common/Text';

import useSettings from '../../../../../hooks/useSettings';

function Blocked() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'privacy.blocked'}
            animationDirection="right"
            title="Blocked contacts"
            onClose={() => updateSettings('open', 'privacy')}
        >
            Disapee
        </Sub>
    );
}

export default Blocked;