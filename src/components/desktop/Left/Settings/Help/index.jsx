import Sub from '../../../views/Sub';

import useSettings from '../../../../../hooks/useSettings';


function Help() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'help'}
            title="Help"
            onClose={() => updateSettings('open', 'settings')}
            p={3}>
            Help
        </Sub>
    );
}

export default Help;