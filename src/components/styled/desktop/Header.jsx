import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Header = styled(Box)(({ theme: { palette }, bl, br }) => ({
    backgroundColor: palette.primaryHeaderBg,
    display: 'flex',
    padding: '10px 16px',
    alignItems: 'center',
    // ...(br && { borderRight: `2px solid ${palette.divider}` }),
    // ...(bl && { borderLeft: `2px solid ${palette.divider}` }),
}));

export default Header;