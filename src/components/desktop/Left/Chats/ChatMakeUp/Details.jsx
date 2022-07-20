import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import IconButton from '../../../../common/IconButton';
import Text from '../../../../common/Text';

const Details = ({ details: c }) => {

    const user = c.partnerInfo;

    return (
        <ListItemText
            primary={<Text>{user.givenName || user.telephone}</Text>}
            secondary={
                <>
                    <Box>
                        <Text flexGrow={1} mr={2} >
                            {c.lastMessage.message}
                        </Text>
                        <Box mr={2} display="flex" alignItems="center">
                            {c.muted && <VolumeOffIcon fontSize='small' />}
                            <Badge color="unread" badgeContent={c.unread} sx={{ ml: 2, color: theme => theme.palette.unread.text }} />
                            <IconButton className="dropdown-menu-button" sx={{ ml: 2, height: 23, width: 23, display: 'none' }} Icon={() => <ExpandMoreIcon fontSize='small' />} />
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                </>
            }
            secondaryTypographyProps={{ component: Box }}
        />
    )
}

export default Details;