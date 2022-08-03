import { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import { lighten } from "@mui/material/styles";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Sub from "../../views/Sub";
import SearchBar from "../SearchBar";
import NoChat from "./NoChat";
import IconButton from "../../../IconButton";
import ContactsList from "../../ContactsList";

import useSettings from '../../../../hooks/useSettings';
import Center from "../../../styled/Center";

function ChatsForNewGroup() {
    const { updateSettings, open, chats } = useSettings();
    const [selected, setSelected] = useState([]);

    const remainingChats = chats.filter(chat => !selected.map(s => s.id).includes(chat.id));

    const handleSelect = value => {
        setSelected([...selected, value]);
    }

    const removeSelected = value => {
        setSelected(selected.filter(s => s.id !== value.id));
    }

    useEffect(() => {
        return () => setSelected([]);
    }, [open])

    return (

        <Sub
            animationDirection="right"
            open={open === 'new-group'}
            Component={Stack}
            title="Add group participants"
            onClose={() => updateSettings('open', null)}
        >

            <Sub.Container Component={Stack} overflow="auto" flexGrow={1}>
                <Box>
                    {selected.length > 0 && (
                        <Stack
                            p={1}
                            maxHeight={200}
                            overflow="auto"
                            className="custom-scrollbar"
                        >
                            <ContactsList
                                list={selected}
                                infoPicker={contact => contact.partnerInfo}
                                MakeUpeComponent={({ info, originalinfo }) => (
                                    <Chip
                                        sx={{ m: 0.5 }}
                                        avatar={<Avatar src={info.dp} />}
                                        key={info.id}
                                        label={info?.givenName || info?.telephone}
                                        onDelete={() => removeSelected(originalinfo)}
                                    />
                                )}
                            />
                        </Stack>
                    )}
                    <SearchBar placeholder="Type contact name" hideArrowIcon />
                </Box>
                {chats.length === 0 ? <NoChat /> : (
                    <ContactsList
                        list={remainingChats}
                        onClick={handleSelect}
                        infoPicker={contact => contact.partnerInfo}
                        checking={false}
                    />
                )
                }
            </Sub.Container>
            {selected.length > 0 && (
                <Center p={2}>
                    <IconButton Icon={ArrowForwardIcon} sx={{
                        bgcolor: theme => theme.palette.secondaryHeaderBg,
                        '&:hover': {
                            bgcolor: theme => lighten(theme.palette.secondaryHeaderBg, 0.5)
                        }
                    }} isx={{
                        color: 'secondaryHeaderText'
                    }} />
                </Center>
            )}
        </Sub>
    );
}

export default ChatsForNewGroup;