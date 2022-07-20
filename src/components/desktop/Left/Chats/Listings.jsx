import { useEffect, useMemo } from "react";

import List from "@mui/material/List";
import ChatMakeUp from "./ChatMakeUp";

import useChats from "../../../../hooks/useChats";
import useSettings from "../../../../hooks/useSettings";
import useMessages from "../../../../hooks/useMessages";

function Listings() {
    const { chats, updateStore, listenForNewChats } = useChats();
    const { listenForNewMessages } = useMessages();
    const { settings } = useSettings();


    useEffect(() => {
        updateStore('chats', settings.chats);
        listenForNewChats();
        listenForNewMessages();
    }, [settings.chats]);

    const allChats = useMemo(() => chats.map(({ id }) => (
        <ChatMakeUp id={id} key={id} />
    )), [chats]);

    return (
        <List className="custom-scrollbar">
            {allChats}
        </List >
    );
}

export default Listings;