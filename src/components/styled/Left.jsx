import Stack from '@mui/material/Stack';
import { darken, styled, lighten } from '@mui/material/styles';

export const Left = styled(Stack)(({ theme: { palette } }) => ({
    '&>div': {
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRight: `2px solid ${(palette.mode === 'light' ? darken : lighten)(palette.primaryHeaderBg, 0.05)}`,
        '&>div': {
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1,
            backgroundColor: palette.background.paper,
            '& .custom-scrollbar': {
                flexGrow: 1,
                overflow: 'auto'
            }
        },
    }
}))