import Center from '../../../styled/common/Center';
import Text from '../../../common/Text';
import Animate from '../../../common/Animate';

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