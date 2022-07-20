import Center from '../../../styled/common/Center';
import Text from '../../../common/Text';

import Animate from '../../../common/Animate';

function NoChatOpen({ show }) {
    return (
        <Animate type='fade'
            in={show}>
            <Center
                textAlign="center"
                bgcolor="primaryHeaderBg">
                <Text ellipsis={false}>No chat Open, click on any to start a conversation.</Text>
            </Center>
        </Animate>

    );
}

export default NoChatOpen;