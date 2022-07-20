import { useEffect, useMemo } from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import AddGroup from "./AddGroup";
import ContactMakeUp from "../../../common/ContactMakeUp";

import useChats from "../../../../hooks/useChats";
import useSettings from "../../../../hooks/useSettings";

function Listings() {
    const { publicContacts, fetchPublicContacts, updateStore, chats } = useChats();
    const { settings } = useSettings();

    useEffect(() => {
        fetchPublicContacts();
    }, []);

    const allChats = useMemo(() => publicContacts.filter(({ id }) => !chats.map(c => c.id).includes(id)).map((contact) => (
        <ContactMakeUp
            onClick={() => updateStore('tempActive', settings._id + '_and_' + contact._id)}
            info={contact}
            key={contact._id} />
    )), [publicContacts]);

    return (
        <List className="custom-scrollbar">
            <AddGroup />
            <Divider sx={{ mt: 1, mb: 2 }} />
            {allChats}
        </List >
    );
}

export default Listings;