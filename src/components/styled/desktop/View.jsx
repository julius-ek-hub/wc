import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

export const DesktopView = styled(Box)(({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&>div': {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'inherit',
        '&:is(:first-of-type)': {
            backgroundColor: '#008069',
            top: 0
        },
        '&:is(:last-of-type)>div': {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            overflowX: 'auto',
            '&>*': {
                height: '100%',
                position: 'absolute',
                transition: '200ms right',
            }
        }
    }
}))