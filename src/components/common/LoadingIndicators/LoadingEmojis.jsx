import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Circle = () => <Skeleton variant="circular" height={40} width={40} />

function LoadingEmojis({ total = 100, loading }) {
    if (!loading) return null
    return (
        <Box display="flex" flexWrap="wrap" mt={2} gap={1}>
            {[...new Array(total)].map((i, j) => (
                <Circle key={j} />
            ))}
        </Box>
    )
}

LoadingEmojis.Circle = Circle;

export default LoadingEmojis;