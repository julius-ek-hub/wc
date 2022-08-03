import MuiCircularProgress from "@mui/material/CircularProgress";

import IconButton from "../IconButton";
import Text from "../Text";
import Center from "../styled/Center";

function CircularProgress({ loading, message, direction = "row", ...rest }) {

    if (!loading) return null;

    return (
        <Center flexDirection={direction} {...rest}>
            <IconButton sx={{ bgcolor: 'background.paper', height: 50, width: 50 }} Icon={() => <MuiCircularProgress size="25px" />} />
            {message && <Text>Hello</Text>}
        </Center>
    );
}

export default CircularProgress;