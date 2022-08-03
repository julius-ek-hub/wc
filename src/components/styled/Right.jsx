// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled, lighten, darken } from '@mui/material/styles';

export const Right = styled(Stack)(({ theme: { palette } }) => ({
    overflow: 'hidden',
    flexDirection: 'column',
    transition: '1s all',
    borderLeft: `2px solid ${(palette.mode === 'light' ? darken : lighten)(palette.primaryHeaderBg, 0.05)}`,
    right: 0,
    '& header': { gap: 2 },
    '& .list': {
        backgroundColor: palette.primaryHeaderBg,
        flexGrow: 1,
        overflow: 'auto',
    }
}))