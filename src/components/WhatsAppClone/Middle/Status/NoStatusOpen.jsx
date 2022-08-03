import Center from '../../../styled/Center';
import Text from '../../../Text';
import Animate from '../../../Animate';

function NoStatusOpen({ show }) {

    return (
        <Animate type='fade' in={show}>
            <Center bgcolor="primaryHeaderBg">
                <Text>No status open</Text>
            </Center>
        </Animate>

    );
}

export default NoStatusOpen;