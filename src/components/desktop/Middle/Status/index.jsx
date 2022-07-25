import NoStatusOpen from './NoStatusOpen';
import useSettings from '../../../../hooks/useSettings';

function Status() {
    const { open } = useSettings();

    return <NoStatusOpen show={open === 'status'} />;
}

export default Status;