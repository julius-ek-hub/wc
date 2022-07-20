import ListItemAvatar from '@mui/material/ListItemAvatar';

import Details from './Details';
import * as Styled from '../../styled/desktop/Chat';

const ContactMakeUp = ({ info, checked, detailsComponent, ...rest }) => {

    return (
        <Styled.Chat {...rest}>
            <ListItemAvatar>
                <Styled.Avatar src={info.dp} />
            </ListItemAvatar>
            {detailsComponent ? detailsComponent : <Details details={info} />}
        </Styled.Chat>
    )
}

export default ContactMakeUp;