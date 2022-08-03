import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';

import Details from './Details';
import * as Styled from '../styled/Chat';

const ContactMakeUp = ({ info, checking, checked, detailsComponent, endComponent, ...rest }) => {

    return (
        <Styled.Chat {...rest}>
            {checking && <Checkbox checked={checked} disableRipple />}
            <ListItemAvatar>
                <Styled.Avatar src={info.dp} />
            </ListItemAvatar>
            {detailsComponent ? detailsComponent : <Details details={info} endComponent={endComponent} />}
        </Styled.Chat>
    )
}

export default ContactMakeUp;