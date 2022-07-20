import NoStatusOpen from './NoStatusOpen';
import useSettings from '../../../../hooks/useSettings';

function Status() {
    const { settings } = useSettings();

    return <NoStatusOpen show={settings.open === 'status'} />;
}

export default Status;