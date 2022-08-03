import Box from '@mui/material/Box';

import StarIcon from '@mui/icons-material/Star';

import Text from '../../../../Text';
import Check from './Check';

import useMessage from '../../../../../hooks/useMessage';

import { date } from '../../../../../utils';

function Receipt(props) {

    const { starred, message, deleted } = useMessage();

    return (
        <Box className="reciept" {...(deleted() && { mt: '-12px !important' })} {...props}>
            {starred && <StarIcon sx={{ fontSize: '1rem', mt: -0.5, mr: 0.2 }} color='disabled' />}
            <Text fontSize="0.6875rem">{date(message.receipt.sent).message}</Text>
            <Check message={message} />
        </Box>
    );
}

export default Receipt;