import Center from '../../../styled/common/Center';
import Text from '../../../common/Text';

import Laptop from '../../Arts/Laptop';
import Mobile from '../../Arts/Mobile';

import Animate from '../../../common/Animate';

function NoChatOpen({ show }) {
    return (
        <Animate type='fade'
            in={show}>
            <Center
                textAlign="center"
                bgcolor="primaryHeaderBg">
                <Mobile sx={{
                    transform: 'rotate(5deg)',
                    mr: '10%'
                }} />
                <Laptop sx={{
                    transform: 'rotate(-5deg)'
                }} />
            </Center>
        </Animate>

    );
}

export default NoChatOpen;