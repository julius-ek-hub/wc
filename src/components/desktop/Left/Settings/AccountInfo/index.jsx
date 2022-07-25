import Sub from '../../../views/Sub';

import useSettings from '../../../../../hooks/useSettings';


function AccountInfo() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'request-account-info'}
            title="Request Account Info"
            onClose={() => updateSettings('open', 'settings')}
            p={3}>
            Request account info
        </Sub>
    );
}

export default AccountInfo;