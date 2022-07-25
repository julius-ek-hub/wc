import { useEffect, useMemo } from "react";

import List from "@mui/material/List";
import ChatMakeUp from "./ChatMakeUp";

import useChats from "../../../../hooks/useChats";
import useSettings from "../../../../hooks/useSettings";
import useMessages from "../../../../hooks/useMessages";

function Listings() {
    const { chats: ch, updateChats, listenForNewChats } = useChats();
    const { listenForNewMessages } = useMessages();
    const { chats } = useSettings();


    useEffect(() => {
        updateChats('chats', chats);
        listenForNewChats();
        listenForNewMessages();
    }, [chats]);

    const allChats = useMemo(() => ch.map(({ id }) => (
        <ChatMakeUp id={id} key={id} />
    )), [ch]);

    return (
        <List className="custom-scrollbar">
            {allChats}
        </List >
    );
}

export default Listings;