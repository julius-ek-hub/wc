import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import PeopleIcon from '@mui/icons-material/People';

import * as Styled from '../../../styled/desktop/Chat';
import Text from '../../../common/Text';

const AddGroup = () => {

    return (
        <Styled.Chat sx={{ p: 1 }}>
            <ListItemAvatar sx={{
                bgcolor: 'secondaryHeaderBg',
                justifyContent: 'center',
                height: 50,
                width: 50,
                minWidth: 'unset',
                borderRadius: 25,
                alignItems: 'center',
                mr: 1,
                ml: 1,
                display: 'flex',
                color: 'secondaryHeaderText'
            }}>
                <PeopleIcon />
            </ListItemAvatar>
            <ListItemText primary={<Text ellipsis>New Group</Text>} />
        </Styled.Chat>
    )
}

export default AddGroup;