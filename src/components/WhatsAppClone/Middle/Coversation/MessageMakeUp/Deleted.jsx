import Box from '@mui/material/Box';

import BlockIcon from '@mui/icons-material/Block';

import Text from '../../../../Text';

import useMessage from '../../../../../hooks/useMessage';
import useSettings from '../../../../../hooks/useSettings';

function Deleted({ message: m, ...rest }) {

    const { deleted } = useMessage(m);
    const { _id } = useSettings();

    return (
        <Text mr={6.5} component="i" alpha={0.3} display="flex" alignItems="center" {...rest}>
            <BlockIcon fontSize='small' sx={{ mr: 0.3 }} />
            {deleted(m)._id === _id ? 'You deleted this message' : 'This message was deleted'}
        </Text>
    );
}

export default Deleted;