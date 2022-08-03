import Sub from '../../views/Sub';
import Listings from '../Chats/Listings';
import NoArchivedChat from './NoArchivedChat';

import useSettings from '../../../../hooks/useSettings';

function Archived() {
    const { open, updateSettings } = useSettings();

    return (
        <Sub
            open={open === 'archived'}
            animationDirection="right"
            title="Archived"
            onClose={() => updateSettings('open', null)}>
            <Sub.Container height="100%" display="flex">
                <Listings archived NoChat={NoArchivedChat} />
            </Sub.Container>
        </Sub>
    );
}

export default Archived;