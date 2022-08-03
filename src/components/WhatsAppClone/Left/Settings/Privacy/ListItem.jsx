import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Text from '../../../../Text';

function ListItem({ Icon = KeyboardArrowRightIcon, title, divider = true, description, ...rest }) {

    return (
        <Box sx={{ cursor: 'pointer', mt: 2 }} {...rest}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box flexGrow={1}>
                    <Text>{title}</Text>
                    <Text color="text.disabled" mt={-0.5} ellipsis={false}>{description}</Text>
                </Box>
                <Icon color="primary" />
            </Box>
            {divider && <Divider sx={{ mt: 1 }} />}
        </Box>
    );
}

export default ListItem;