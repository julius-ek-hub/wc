import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


export const EachContact = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    marginTop: 10
}));

export const ActionContainer = styled(Box)(() => ({
    flexGrow: 1,
    display: "flex",
    gap: '20px',
    justifyContent: "flex-end",
    marginRight: '20px'
}));

export const MainContainer = styled(Box)(() => ({
    padding: 10,
    overflow: 'hidden'
}));

