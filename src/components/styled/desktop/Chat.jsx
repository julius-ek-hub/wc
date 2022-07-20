import ListItem from '@mui/material/ListItem';
import MuiAvatar from '@mui/material/Avatar';

import { styled, lighten, darken } from '@mui/material/styles';

export const Chat = styled(ListItem)(({ theme: { palette }, active }) => ({
    paddingTop: 0,
    paddingBottom: 0,
    cursor: 'pointer',
    '& .MuiListItemText-secondary>*': {
        '&:first-of-type': {
            display: 'flex',
            '&>*': {
                color: (palette.mode === 'light' ? lighten : darken)(palette.text.primary, 0.4),
            }
        }
    },
    '&:hover': {
        backgroundColor: (palette.mode === 'light' ? lighten : darken)(palette.primaryHeaderBg, 0.7),
        '& .dropdown-menu-button': {
            display: 'flex'
        },
        '& hr': {
            visibility: 'hidden'
        }
    },
    ...((active === 'true') && {
        backgroundColor: palette.primaryHeaderBg,
        '& hr': {
            visibility: 'hidden'
        }
    })
}));

export const Avatar = styled(MuiAvatar)(() => ({
    height: 50,
    width: 50,
    marginRight: '8px'
}));
