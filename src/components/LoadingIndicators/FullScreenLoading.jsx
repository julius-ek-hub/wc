import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import { alpha } from "@mui/material/styles";

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LockIcon from '@mui/icons-material/Lock';

import Center from "../styled/Center";
import Text from "../Text";

function FullScreenLoading({ message = "WhatsApp Clone", transparent = false, loading = false }) {

    if (!loading) return null;

    return (
        <Backdrop open sx={{
            zIndex: 10000,
            bgcolor: theme => alpha(theme.palette.background.paper, transparent ? 0.8 : 1)
        }}
            transitionDuration={0}>
            <Center flexDirection="column" width={'50%'}>
                <WhatsAppIcon sx={{ fontSize: 70 }} color="disabled" />
                <Box width={'100%'} mt={3}>
                    <LinearProgress color="loadLine" />
                </Box>
                {message && <Text mt={2}>{message}</Text>}
                <Text p={2} fontSize="small" display="flex" alignItems="center">
                    <LockIcon fontSize="small" sx={{ mr: 0.5 }} />
                    End-to-end encrypted
                </Text>
            </Center>
        </Backdrop>
    );
}

export default FullScreenLoading;