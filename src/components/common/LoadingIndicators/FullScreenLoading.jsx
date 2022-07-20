import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";

function FullScreenLoading({ message, transparent = false, loading = false }) {

    if (!loading) return null;

    return (
        <Backdrop open sx={{
            zIndex: 10000,
            bgcolor: theme => alpha(theme.palette.background.paper, transparent ? 0.8 : 1)
        }}
            transitionDuration={0}>
            <CircularProgress />
            {message && <Typography p={2} color="primary">{message}</Typography>}
        </Backdrop>
    );
}

export default FullScreenLoading;