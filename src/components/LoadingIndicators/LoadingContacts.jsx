import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack'

const generateArrays = length => {
    return [...new Array(length)].map((...args) => args[1]);
}

function LoadingContacts({ total = 10, loading }) {

    if (!loading) return null;

    return (
        <Stack p={1.5}>
            {generateArrays(total).map(i => (
                <Box key={i} display="flex" mt={1}>
                    <Skeleton variant="circular" height={50} width={50} />
                    <Box ml={1} flexGrow={1}>
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="90%" />
                    </Box>
                </Box>
            ))}
        </Stack>
    );
}

export default LoadingContacts;