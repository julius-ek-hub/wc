import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Middle = styled(Box)(() => ({
    '&>div': {
        height: '100%',
        overflow: 'hidden'
    },
    '& header>div': {
        '&:first-of-type': {
            display: "flex",
            flexGrow: 1,
            cursor: 'pointer'
        },
        '&:last-of-type': { alignItems: "center" }
    }
}))

export const NoChatOpen = styled(Box)(() => ({
    '&>div': { height: '100%' },
    '& header>div': {
        '&:first-of-type': {
            display: "flex",
            flexGrow: 1,
            cursor: 'pointer'
        },
        '&:last-of-type': { alignItems: "center" }
    }
}))