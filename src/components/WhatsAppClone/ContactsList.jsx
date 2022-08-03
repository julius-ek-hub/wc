import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";

import { TransitionGroup } from 'react-transition-group';

import ContactMakeUp from "../ContactMakeUp";
import LoadingContacts from "../LoadingIndicators/LoadingContacts";

function ContactsList({
    onClick,
    list = [],
    beforeListComponent,
    NoChat,
    loading,
    MakeUpeComponent = ContactMakeUp,
    infoPicker }) {

    return (
        <List className="custom-scrollbar" sx={{
            flexGrow: 1,
            overflow: 'auto',
        }}>
            {beforeListComponent}
            {(list.length === 0 && NoChat) && <NoChat />}
            <TransitionGroup>
                {list.map((c, index) => (
                    <Collapse key={c.id || c._id}>
                        <MakeUpeComponent
                            onClick={() => onClick && onClick(c)}
                            info={infoPicker ? infoPicker(c) : c}
                            originalinfo={c}
                            checking={false}
                            showdivider={String(index !== list.length - 1)}
                        />
                    </Collapse>
                ))}
            </TransitionGroup>
            <LoadingContacts loading={loading} />
        </List>

    );
}

export default ContactsList;