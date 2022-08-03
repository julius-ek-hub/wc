import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";

import AddGroup from "./AddGroup";
import ContactsList from "../../ContactsList";

import useChats from "../../../../hooks/useChats";

function Listings() {
    const { publicContacts, fetchPublicContacts, addTempChat } = useChats();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchPublicContacts().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Divider sx={{ mt: 1 }} />
            <ContactsList
                loading={loading}
                beforeListComponent={<AddGroup />}
                list={[...publicContacts].reverse()}
                onClick={addTempChat}
            />
        </>
    );
}

export default Listings;