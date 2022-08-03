import Divider from '@mui/material/Divider';

import Center from '../../../styled/Center';
import Text from '../../../Text';

import Laptop from '../../Arts/Laptop';
import Mobile from '../../Arts/Mobile';

import Animate from '../../../Animate';

function NoChatOpen({ show }) {
    return (
        <Animate type='fade'
            in={show}>
            <Center flexDirection="column" bgcolor="primaryHeaderBg">
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
                <Divider sx={{ width: '60%', m: 4 }} />
                <Text variant="h5">WhatsApp Clone</Text>
            </Center>
        </Animate>

    );
}

export default NoChatOpen;