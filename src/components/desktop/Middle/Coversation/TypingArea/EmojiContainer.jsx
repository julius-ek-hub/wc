import Box from '@mui/material/Box';

import Animate from '../../../../common/Animate';
import EmojiPicker from '../../../../common/EmojiPicker';

function EmojiContainer({ open, ...rest }) {
    return (
        <Animate in={Boolean(open)} direction="up">
            <Box height='270px' mb={1}>
                <EmojiPicker {...rest} />
            </Box>
        </Animate>
    );
}

export default EmojiContainer;