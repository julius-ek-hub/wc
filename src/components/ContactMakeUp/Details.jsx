import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box';

import Text from '../Text';
import useSettings from '../../hooks/useSettings';

const Details = ({ details: c, endComponent }) => {
    const { _id } = useSettings();

    return (
        <ListItemText
            primary={<Text ellipsis minHeight="24px">{_id === c._id ? 'You' : (c.givenName || c.telephone)}</Text>}
            secondary={
                <>
                    <Box>
                        <Text ellipsis flexGrow={1} mr={2} minHeight="24px">
                            {c.bio}
                        </Text>
                        {endComponent && endComponent}
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                </>
            }
            secondaryTypographyProps={{ component: Box }}
        />
    )
}

export default Details;