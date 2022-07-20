import Box from '@mui/material/Box';

import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';

function Notification() {
    return (

        <Box sx={{ bgcolor: '#53bdeb', p: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 20,
                bgcolor: 'background.paper'
            }}>
                <NotificationsOffRoundedIcon sx={{ fontSize: 25 }} />
            </Box>
        </Box>
    );
}

export default Notification;