import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box';



import Text from '../Text';

const Details = ({ details: c }) => {

    return (
        <ListItemText
            primary={<Text ellipsis>{c.givenName || c.telephone}</Text>}
            secondary={
                <>
                    <Box>
                        <Text ellipsis flexGrow={1} mr={2} >
                            {c.status || "Hi there, I'm using WhatsApp clone"}
                        </Text>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                </>
            }
            secondaryTypographyProps={{ component: Box }}
        />
    )
}

export default Details;