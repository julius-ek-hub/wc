import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import DropDownMenu from '../../../../../DropDownMenu';
import AllReactions from './AllReactions';

import useMessage from '../../../../../../hooks/useMessage';


function Reactions() {
    const { message, iSent, deleted } = useMessage();
    const reactions = message.reactions;

    const len = reactions.length;

    if (len === 0 || deleted()) return null;

    return (
        <DropDownMenu
            closeOnClick={false}
            horizontalDirection={iSent ? 'right' : 'left'}
            InvokeComponent={props => (
                <AvatarGroup
                    {...props}
                    total={len}
                    sx={{
                        cursor: 'pointer',
                        position: 'absolute',
                        zIndex: 20,
                        right: 10,
                        bottom: -20,
                    }}
                    componentsProps={{
                        additionalAvatar: {
                            sx: { height: 25, width: 25 }
                        }
                    }}>
                    {reactions.slice(0, 5).map(({ character, slug }) => (
                        <Avatar sx={{
                            height: 25,
                            width: 25,
                            p: 0,
                            fontSize: '0.8rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: 'background.paper'
                        }} key={slug}>{character}</Avatar>
                    ))}
                </AvatarGroup>
            )}>
            <AllReactions />
        </DropDownMenu>
    );
}

export default Reactions;