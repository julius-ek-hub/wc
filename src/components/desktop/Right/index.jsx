import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Text from "../../common/Text";
import * as Styled from "../../styled/desktop/Right";
import Header from "./Header";

import useChats from "../../../hooks/useChats";
import useDimension from "../../../hooks/useDimension";

function Right() {
    const { activeChat, userInfoOpened } = useChats();
    const { mainRightWidth } = useDimension();

    const c = activeChat()?.partnerInfo || {};

    return (
        <Fade timeout={700} mountOnEnter unmountOnExit in={userInfoOpened}>
            <Styled.Right width={mainRightWidth}>
                <Header />
                <Stack className="list custom-scrollbar" overflow="hidden">
                    <Stack alignItems="center" bgcolor="background.paper" p={3}>
                        <Avatar sx={{ height: 200, width: 200 }} src={c.dp} />
                        <Text variant="h5" mt={1}>{c.givenName || c.userName}</Text>
                        <Text>{c.telephone}</Text>
                    </Stack>
                    <Box bgcolor="background.paper" p={1} mt={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.primary">Media, links and docs</Typography>
                            <IconButton>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                        <Box height={100}></Box>
                    </Box>
                    <Box bgcolor="background.paper" p={1} mt={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.primary">Media, links and docs</Typography>
                            <IconButton>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                        <Box height={100}></Box>
                    </Box>
                    <Box bgcolor="background.paper" p={1} mt={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.primary">Media, links and docs</Typography>
                            <IconButton>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                        <Box height={100}></Box>
                    </Box>
                    <Box bgcolor="background.paper" p={1} mt={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.primary">Media, links and docs</Typography>
                            <IconButton>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                        <Box height={100}></Box>
                    </Box>
                    <Box bgcolor="background.paper" p={1} mt={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.primary">Media, links and docs</Typography>
                            <IconButton>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                        <Box height={100}></Box>
                    </Box>
                </Stack>
            </Styled.Right>
        </Fade>
    );
}

export default Right;